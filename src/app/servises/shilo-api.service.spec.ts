import { TestBed } from '@angular/core/testing';

import { ShiloApiService } from './shilo-api.service';

describe('ShiloApiService', () => {
  let service: ShiloApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShiloApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
