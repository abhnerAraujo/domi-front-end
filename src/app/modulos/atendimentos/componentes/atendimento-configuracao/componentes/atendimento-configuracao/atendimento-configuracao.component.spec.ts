import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentoConfiguracaoComponent } from './atendimento-configuracao.component';

describe('AtendimentoConfiguracaoComponent', () => {
  let component: AtendimentoConfiguracaoComponent;
  let fixture: ComponentFixture<AtendimentoConfiguracaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtendimentoConfiguracaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendimentoConfiguracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
