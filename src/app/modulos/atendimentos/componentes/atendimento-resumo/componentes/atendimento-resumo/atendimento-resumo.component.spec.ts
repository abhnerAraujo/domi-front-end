import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentoResumoComponent } from './atendimento-resumo.component';

describe('AtendimentoResumoComponent', () => {
  let component: AtendimentoResumoComponent;
  let fixture: ComponentFixture<AtendimentoResumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtendimentoResumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendimentoResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
