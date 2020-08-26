import { slideInAnimation } from './animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from './../environments/environment';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'Domi';
  firebaseConfig: any;
  constructor() {
    // this.firebaseConfig = environment.firebaseConfig;
    // firebase.initializeApp(this.firebaseConfig);
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}

