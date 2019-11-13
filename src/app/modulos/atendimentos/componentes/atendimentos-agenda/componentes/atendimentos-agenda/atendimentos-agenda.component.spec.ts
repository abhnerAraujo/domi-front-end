import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentosAgendaComponent } from './atendimentos-agenda.component';

describe('AtendimentosListaComponent', () => {
  let component: AtendimentosAgendaComponent;
  let fixture: ComponentFixture<AtendimentosAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AtendimentosAgendaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendimentosAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
