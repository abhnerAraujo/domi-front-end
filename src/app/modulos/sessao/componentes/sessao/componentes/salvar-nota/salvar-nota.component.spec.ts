import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvarNotaComponent } from './salvar-nota.component';

describe('SalvarNotaComponent', () => {
  let component: SalvarNotaComponent;
  let fixture: ComponentFixture<SalvarNotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalvarNotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalvarNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
