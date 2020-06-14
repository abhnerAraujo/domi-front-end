import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacosListaComponent } from './espacos-lista.component';

describe('EspacosListaComponent', () => {
  let component: EspacosListaComponent;
  let fixture: ComponentFixture<EspacosListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspacosListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspacosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
