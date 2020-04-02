import { TestBed } from '@angular/core/testing';

import { TiposPagamentoService } from './tipos-pagamento.service';

describe('TiposPagamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TiposPagamentoService = TestBed.get(TiposPagamentoService);
    expect(service).toBeTruthy();
  });
});
