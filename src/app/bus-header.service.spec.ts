import { TestBed } from '@angular/core/testing';

import { BusHeaderService } from './bus-header.service';

describe('BusHeaderService', () => {
  let service: BusHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
