import { TestBed } from '@angular/core/testing';

import { AtendimentosService } from './atendimentos.service';

describe('AtendimentosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AtendimentosService = TestBed.get(AtendimentosService);
    expect(service).toBeTruthy();
  });
});
