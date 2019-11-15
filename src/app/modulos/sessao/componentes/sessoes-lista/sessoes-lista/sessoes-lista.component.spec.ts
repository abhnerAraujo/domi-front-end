import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessoesListaComponent } from './sessoes-lista.component';

describe('SessoesListaComponent', () => {
  let component: SessoesListaComponent;
  let fixture: ComponentFixture<SessoesListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessoesListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessoesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
