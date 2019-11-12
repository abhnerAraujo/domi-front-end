import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdicionarEventoComponent } from './dialog-adicionar-evento.component';

describe('DialogAdicionarEventoComponent', () => {
  let component: DialogAdicionarEventoComponent;
  let fixture: ComponentFixture<DialogAdicionarEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAdicionarEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAdicionarEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
