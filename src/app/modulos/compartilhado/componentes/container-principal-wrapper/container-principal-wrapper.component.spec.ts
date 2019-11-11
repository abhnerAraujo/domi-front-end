import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerPrincipalWrapperComponent } from './container-principal-wrapper.component';

describe('ContainerPrincipalWrapperComponent', () => {
  let component: ContainerPrincipalWrapperComponent;
  let fixture: ComponentFixture<ContainerPrincipalWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerPrincipalWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerPrincipalWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
