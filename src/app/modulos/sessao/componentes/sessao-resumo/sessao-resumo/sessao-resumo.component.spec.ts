import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessaoResumoComponent } from './sessao-resumo.component';

describe('SessaoResumoComponent', () => {
  let component: SessaoResumoComponent;
  let fixture: ComponentFixture<SessaoResumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessaoResumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessaoResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
