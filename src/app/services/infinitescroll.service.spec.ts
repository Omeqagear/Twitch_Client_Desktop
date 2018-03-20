import { TestBed, inject } from '@angular/core/testing';

import { InfinitescrollService } from './infinitescroll.service';

describe('InfinitescrollService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfinitescrollService]
    });
  });

  it('should be created', inject([InfinitescrollService], (service: InfinitescrollService) => {
    expect(service).toBeTruthy();
  }));
});
