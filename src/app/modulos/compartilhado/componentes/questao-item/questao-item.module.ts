import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestaoItemComponent } from './questao-item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatButtonModule, MatInputModule, MatCardModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [QuestaoItemComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports: [
    QuestaoItemComponent
  ]
})
export class QuestaoItemModule { }
