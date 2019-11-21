import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestaoItemComponent } from './questao-item.component';

describe('QuestaoItemComponent', () => {
  let component: QuestaoItemComponent;
  let fixture: ComponentFixture<QuestaoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestaoItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestaoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
