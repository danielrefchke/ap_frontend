import { TestBed } from '@angular/core/testing';

import { SincroService } from './sincro.service';

describe('SincroService', () => {
  let service: SincroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SincroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
