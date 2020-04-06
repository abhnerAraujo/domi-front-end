import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanejamentoItemComponent } from './planejamento-item.component';

describe('PlanejamentoItemComponent', () => {
  let component: PlanejamentoItemComponent;
  let fixture: ComponentFixture<PlanejamentoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanejamentoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanejamentoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
