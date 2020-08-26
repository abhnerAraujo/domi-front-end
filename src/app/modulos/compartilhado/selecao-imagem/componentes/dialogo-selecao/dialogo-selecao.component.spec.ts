import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoSelecaoComponent } from './dialogo-selecao.component';

describe('DialogoSelecaoComponent', () => {
  let component: DialogoSelecaoComponent;
  let fixture: ComponentFixture<DialogoSelecaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoSelecaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoSelecaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
