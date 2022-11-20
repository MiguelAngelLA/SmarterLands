import { TestBed } from '@angular/core/testing';

import { BinsService } from './bins.service';

describe('BinsService', () => {
  let service: BinsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BinsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
