import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import config from '../config';
import { request } from 'https';

const resquest = require('request');

@Injectable()
export class TwitchService {

  access_token = null;
  twitch = null;
  games_offset = 0;
  streams_offset = 0;
  followed_streams_offset = 0;
  authUrl: string;
  logued = false;
  authUserInfo: any = null;

  baseUrl = 'https://api.twitch.tv/kraken';

  // Observable that tell login status changes
  private loginChange: Subject<Object> = new Subject<Object>();
  loginChange$ = this.loginChange.asObservable();

  constructor() { }

  executeRequest(options, paramenter, callback?) {
    if (!callback) {
      callback = paramenter;
      paramenter = undefined;
    }

    const req = {
      method: options.method,
      url: this.baseUrl + options.path,
      qs: paramenter,
      headers: {
        'Authorization': options.accessToken ? 'OAuth ' + options.accessToken : undefined,
        'Accept': 'Accept: application/vnd.twitchtv.v5+json',
        'Client-ID': config.client_id
      },
      body: options.body,
      json: true
    };

    request(req, (res) => {
        console.log(res.statusCode);
        console.log(res.headers['content-type']);
    });
  }

  // Return Authenticated User Info
  getAutheticatedUser(access_token): Promise<any> {
    if (access_token) {
      if (this.authUserInfo !== null && this.access_token === access_token) {
        return Promise.resolve(this.authUserInfo);
      }
    } else {
      return new Promise<any>((resolve, reject) => {
        this.executeRequest({
          method: 'Get',
          path: '/user',
          accessToken: access_token
        }, (err, userInfo) => {
          if (err || !userInfo) { reject(err); } else {

              this.access_token = access_token;
              console.log(userInfo);
              this.authUserInfo = userInfo;
              this.loginChange.next(userInfo);
              resolve(userInfo);
          }
        });
      });
    }
  }

  // Clears all login information and emit logout event
  logout() {
    this.authUserInfo = null;
    this.access_token = null;
    this.logued = false;
    this.loginChange.next(null);
  }

  // Returns a promise that resolves to a list of games objects sorted by number
  // of current viewers on Twitch, most popular first.
  getTopGames() {
    return new Promise((resolve, reject) => {
      this.executeRequest({
        method: 'GET',
        path: '/games/top'
      },
        {limit: 25},
        (err, games) => {
          if (err || !games) { reject(err); } else {
            this.games_offset = 1;
            resolve(games);
          }
        }
      );
    });
  }

  // Fetch next page of top games, ussing this.games_offset as offset param
  fetchMoreTopGames() {
    return new Promise((resolve, reject) => {
      this.executeRequest({
        method: 'GET',
        path: '/games/top'
      },
        {
          limit: 25,
          offset: this.games_offset * 25
        },
        (err, games) => {
          if (err || !games) { reject(err); } else {
            this.games_offset++;
            resolve(games);
          }
        }
      );
    });
  }

  // Returns a promise that resovles to a list of stream objects that are queried by a
  // number of parameters sorted by number of viewers descending.
  // If game specified, filters by game
  // If game is null, get top streams of all games
  getStreams(game?) {
    return new Promise((resolve, reject) => {
      const params: any = {limit: 25};
      if (game) { params.game = game; }
      this.executeRequest({
        method: 'GET',
        path: '/streams'
      }, params, (err, body) => {
        if (err || !body) { reject(err); } else {
          this.streams_offset = 1;
          resolve(body);
        }
      });
    });
  }

  // Fetch next page of streams, using this.streams_offset as offset param
  fetchMoreStreams(game?) {
    return new Promise((resolve, reject) => {
      const params: any = { limit: 25, offset: this.streams_offset * 25};
      if (game) { params.game = game; }
      this.executeRequest({
        method: 'GET',
        path: '/streams'
      }, params, (err, body) => {
        if (err || !body) { reject(err); } else {
          this.streams_offset++;
          resolve(body);
        }
      });
    });
  }

  // Returns a promise that resolves to a list of stream objects that the authenticated user is following.
  getFollowedStreams() {
    return new Promise((resolve, reject) => {
      this.executeRequest({
        method: 'GET',
        path: '/streams/followed',
        accessToken: this.access_token
      },
      {
        limit: 25
      }, (err, followedStreams) => {
        if (err || !followedStreams) { reject(err); } else {
          this.followed_streams_offset = 1;
          resolve(followedStreams);
        }
      });
    });
  }
}

