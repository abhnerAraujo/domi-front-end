import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoCadastroEspacoComponent } from './dialogo-cadastro-espaco.component';

describe('DialogoCadastroEspacoComponent', () => {
  let component: DialogoCadastroEspacoComponent;
  let fixture: ComponentFixture<DialogoCadastroEspacoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoCadastroEspacoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoCadastroEspacoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
