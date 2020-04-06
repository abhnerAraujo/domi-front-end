import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanejamentoListaComponent } from './planejamento-lista.component';

describe('PlanejamentoListaComponent', () => {
  let component: PlanejamentoListaComponent;
  let fixture: ComponentFixture<PlanejamentoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanejamentoListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanejamentoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
