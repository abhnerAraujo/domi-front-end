import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ProgressBarService {

  private loaderSubject = new Subject<boolean>();
  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  show() {
    this.loaderSubject.next(true);
  }

  hide() {
    this.loaderSubject.next(false);
  }
}
