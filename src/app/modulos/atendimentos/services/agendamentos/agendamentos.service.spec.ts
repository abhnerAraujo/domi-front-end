import { TestBed } from '@angular/core/testing';

import { AgendamentosService } from './agendamentos.service';

describe('AtendimentosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgendamentosService = TestBed.get(AgendamentosService);
    expect(service).toBeTruthy();
  });
});
