import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoDetalheComponent } from './avaliacao-detalhe.component';

describe('AvaliacaoDetalheComponent', () => {
  let component: AvaliacaoDetalheComponent;
  let fixture: ComponentFixture<AvaliacaoDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AvaliacaoDetalheComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliacaoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
