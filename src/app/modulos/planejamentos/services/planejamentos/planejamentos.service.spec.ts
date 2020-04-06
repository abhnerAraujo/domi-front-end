import { TestBed } from '@angular/core/testing';

import { PlanejamentosService } from './planejamentos.service';

describe('PlanejamentosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanejamentosService = TestBed.get(PlanejamentosService);
    expect(service).toBeTruthy();
  });
});
