import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrosHomeComponent } from './cadastros-home.component';

describe('CadastrosHomeComponent', () => {
  let component: CadastrosHomeComponent;
  let fixture: ComponentFixture<CadastrosHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrosHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
