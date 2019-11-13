import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentosHomeComponent } from './atendimentos-home.component';

describe('AtendimentosHomeComponent', () => {
  let component: AtendimentosHomeComponent;
  let fixture: ComponentFixture<AtendimentosHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtendimentosHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendimentosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
