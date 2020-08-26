import { TestBed } from '@angular/core/testing';

import { ResponsavelTiposService } from './responsavel-tipos.service';

describe('ResponsavelTiposService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResponsavelTiposService = TestBed.get(ResponsavelTiposService);
    expect(service).toBeTruthy();
  });
});
