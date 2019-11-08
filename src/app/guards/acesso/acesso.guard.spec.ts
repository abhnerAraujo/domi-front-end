import { TestBed, async, inject } from '@angular/core/testing';

import { AcessoGuard } from './acesso.guard';

describe('AcessoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcessoGuard]
    });
  });

  it('should ...', inject([AcessoGuard], (guard: AcessoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
