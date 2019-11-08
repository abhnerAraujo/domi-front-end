import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegacaoMenuComponent } from './navegacao-menu.component';

describe('NavegacaoMenuComponent', () => {
  let component: NavegacaoMenuComponent;
  let fixture: ComponentFixture<NavegacaoMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegacaoMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegacaoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
