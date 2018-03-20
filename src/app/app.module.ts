import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatDividerModule, MatButtonModule, MatIconModule } from '@angular/material';

// Components
import { AppComponent } from './app.component';
import { PlayerComponent } from './components/player/player.component';
import { GamesComponent } from './components/games/games.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { InfiniteScrollComponent } from './components/infinite-scroll/infinite-scroll.component';
import { ErrorhandlerComponent } from './components/errorhandler/errorhandler.component';
import { ChannelsComponent } from './components/channels/channels.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

// Services
import { GamesService } from './services/games.service';
import { SpinnerService } from './services/spinner.service';
import { ChannelsService } from './services/channels.service';
import { ErrorhandlerService } from './services/errorhandler.service';
import { TwitchService } from './services/twitch.service';
import { ToolbarService } from './services/toolbar.service';




@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    SpinnerComponent,
    SidebarComponent,
    ErrorhandlerComponent,
    InfiniteScrollComponent,
    ChannelsComponent,
    GamesComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [
    GamesService,
    SpinnerService,
    TwitchService,
    ToolbarService,
    ChannelsService,
    ErrorhandlerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
