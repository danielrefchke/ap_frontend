import { TestBed } from '@angular/core/testing';

import { BusItemService } from './bus-item.service';

describe('BusItemService', () => {
  let service: BusItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
