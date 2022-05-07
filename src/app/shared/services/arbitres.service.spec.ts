import { TestBed } from '@angular/core/testing';

import { ArbitreService } from './arbitres.service';

describe('ArbitreService', () => {
  let service: ArbitreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArbitreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
