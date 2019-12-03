import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GravarAudioComponent } from './gravar-audio.component';

describe('GravarAudioComponent', () => {
  let component: GravarAudioComponent;
  let fixture: ComponentFixture<GravarAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GravarAudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GravarAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
