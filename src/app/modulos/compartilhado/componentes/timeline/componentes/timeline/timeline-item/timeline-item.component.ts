import { Component, OnInit, Input } from '@angular/core';
import { TimeLineItem, TimeLineConfig } from '../timeline.component';

@Component({
  selector: 'app-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss']
})
export class TimelineItemComponent implements OnInit {

  @Input() item: TimeLineItem;
  @Input() config: TimeLineConfig;
  @Input() ultimo: boolean;

  hover: boolean;

  constructor() { }

  ngOnInit() {
  }

}
