import { TestBed } from '@angular/core/testing';

import { UserHeadlessDataService } from './user-headless.data.service';

describe('UserHeadlessDataService', () => {
  let service: UserHeadlessDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserHeadlessDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
