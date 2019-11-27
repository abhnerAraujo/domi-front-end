import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule, MatIconModule, MatSliderModule, MatDialogModule,
  MatInputModule, MatFormFieldModule, MatButtonToggleModule, MatDividerModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfigDiaAtendimentoComponent } from './dialog-config-dia-atendimento.component';

@NgModule({
  declarations: [DialogConfigDiaAtendimentoComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSliderModule,
    NgxMaterialTimepickerModule.setLocale('pt-BR'),
    MatButtonToggleModule
  ],
  entryComponents: [
    DialogConfigDiaAtendimentoComponent
  ],
  exports: [DialogConfigDiaAtendimentoComponent]
})
export class DialogConfigDiaAtendimentoModule { }
