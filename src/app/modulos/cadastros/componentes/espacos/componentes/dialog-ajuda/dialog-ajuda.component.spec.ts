import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAjudaComponent } from './dialog-ajuda.component';

describe('DialogAjudaComponent', () => {
  let component: DialogAjudaComponent;
  let fixture: ComponentFixture<DialogAjudaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAjudaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAjudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
