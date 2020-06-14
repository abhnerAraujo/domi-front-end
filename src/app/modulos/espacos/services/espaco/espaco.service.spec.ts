import { TestBed } from '@angular/core/testing';

import { EspacoService } from './espaco.service';

describe('EspacoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EspacoService = TestBed.get(EspacoService);
    expect(service).toBeTruthy();
  });
});
