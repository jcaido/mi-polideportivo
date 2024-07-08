import { TestBed } from '@angular/core/testing';

import { AvailableDateService } from './available-date.service';

describe('AvailableDateService', () => {
  let service: AvailableDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailableDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
