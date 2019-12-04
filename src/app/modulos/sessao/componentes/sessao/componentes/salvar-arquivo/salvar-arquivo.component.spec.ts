import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvarArquivoComponent } from './salvar-arquivo.component';

describe('SalvarArquivoComponent', () => {
  let component: SalvarArquivoComponent;
  let fixture: ComponentFixture<SalvarArquivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalvarArquivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalvarArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
