import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentosListaComponent } from './atendimentos-lista.component';

describe('AtendimentosListaComponent', () => {
  let component: AtendimentosListaComponent;
  let fixture: ComponentFixture<AtendimentosListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtendimentosListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendimentosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
