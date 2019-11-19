import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnamneseDetalheComponent } from './anamnese-detalhe.component';

describe('AnamneseDetalheComponent', () => {
  let component: AnamneseDetalheComponent;
  let fixture: ComponentFixture<AnamneseDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnamneseDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnamneseDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
