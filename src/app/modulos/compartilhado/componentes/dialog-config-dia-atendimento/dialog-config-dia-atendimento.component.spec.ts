import { DialogConfigDiaAtendimentoComponent } from './dialog-config-dia-atendimento.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


describe('DialogConfigDiaAtendimentoComponent', () => {
  let component: DialogConfigDiaAtendimentoComponent;
  let fixture: ComponentFixture<DialogConfigDiaAtendimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogConfigDiaAtendimentoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfigDiaAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
