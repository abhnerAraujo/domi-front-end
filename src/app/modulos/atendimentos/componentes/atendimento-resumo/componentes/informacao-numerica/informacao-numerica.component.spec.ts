import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacaoNumericaComponent } from './informacao-numerica.component';

describe('InformacaoNumericaComponent', () => {
  let component: InformacaoNumericaComponent;
  let fixture: ComponentFixture<InformacaoNumericaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacaoNumericaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacaoNumericaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
