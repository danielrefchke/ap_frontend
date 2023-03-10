import { TestBed } from '@angular/core/testing';

import { BusSectionService } from './bus-section.service';

describe('BusSectionService', () => {
  let service: BusSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
