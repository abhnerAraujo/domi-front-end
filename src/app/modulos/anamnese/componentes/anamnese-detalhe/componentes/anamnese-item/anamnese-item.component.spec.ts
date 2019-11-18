import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnamneseItemComponent } from './anamnese-item.component';

describe('AnamneseItemComponent', () => {
  let component: AnamneseItemComponent;
  let fixture: ComponentFixture<AnamneseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnamneseItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnamneseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
