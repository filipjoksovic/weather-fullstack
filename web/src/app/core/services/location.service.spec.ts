import { TestBed } from '@angular/core/testing';

import { GeoLocationService } from './geolocation.service';

describe('LocationService', () => {
  let service: GeoLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
