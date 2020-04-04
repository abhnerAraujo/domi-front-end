import { TestBed } from '@angular/core/testing';

import { EscolaridadesService } from './escolaridades.service';

describe('EscolaridadesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EscolaridadesService = TestBed.get(EscolaridadesService);
    expect(service).toBeTruthy();
  });
});
