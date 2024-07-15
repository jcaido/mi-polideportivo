import { TestBed } from '@angular/core/testing';

import { TimeBookServiceService } from './time-book-service.service';

describe('TimeBookServiceService', () => {
  let service: TimeBookServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeBookServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
