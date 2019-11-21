import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetNavegacaoComponent } from './bottom-sheet-navegacao.component';

describe('BottomSheetNavegacaoComponent', () => {
  let component: BottomSheetNavegacaoComponent;
  let fixture: ComponentFixture<BottomSheetNavegacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomSheetNavegacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSheetNavegacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
