import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarSessaoComponent } from './finalizar-sessao.component';

describe('FinalizarSessaoComponent', () => {
  let component: FinalizarSessaoComponent;
  let fixture: ComponentFixture<FinalizarSessaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizarSessaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarSessaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
