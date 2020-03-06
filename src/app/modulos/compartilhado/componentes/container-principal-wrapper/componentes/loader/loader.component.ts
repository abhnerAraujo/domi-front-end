import { Subscription } from 'rxjs';
import { ProgressBarService } from './../../services/progress-bar/progress-bar.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  progressBar: boolean;
  progressBarSubscription: Subscription;

  @Input()
  set loading(value: boolean, ) {
    this.progressBar = value;
  }

  constructor(private progressBarService: ProgressBarService) { }

  ngOnInit() {
    this.progressBarSubscription = this.progressBarService.loaderState.subscribe(
      this.mudaEstado
    );
  }

  mudaEstado = (estado: boolean) => this.progressBar = estado;

}
