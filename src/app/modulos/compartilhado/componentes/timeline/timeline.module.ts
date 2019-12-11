import { FlexLayoutModule } from '@angular/flex-layout';
import { TimelineComponent } from './componentes/timeline/timeline.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineItemComponent } from './componentes/timeline/timeline-item/timeline-item.component';

@NgModule({
  declarations: [TimelineComponent, TimelineItemComponent],
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  exports: [TimelineComponent]
})
export class TimelineModule { }
