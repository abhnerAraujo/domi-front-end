import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-container-principal-wrapper',
  templateUrl: './container-principal-wrapper.component.html',
  styleUrls: ['./container-principal-wrapper.component.scss']
})
export class ContainerPrincipalWrapperComponent implements OnInit {

  sidenavEsquerdoAberto: boolean;
  sidenavDireitoAberto: boolean;
  sidenavEsquerdoMode: string;

  mediaQuerySubscription: Subscription;
  activeMediaQuery: string;

  constructor(private mediaObserver: MediaObserver) {
    this.sidenavEsquerdoAberto = true;
    this.sidenavDireitoAberto = true;
    this.mediaQuerySubscription = this.mediaObserver.asObservable().subscribe(
      (change: MediaChange[]) => {
        this.activeMediaQuery = change[0].mqAlias;
        if (this.activeMediaQuery === 'xs' || this.activeMediaQuery === 'sm') {
          this.sidenavDireitoAberto = false;
          this.sidenavEsquerdoAberto = false;
          this.sidenavEsquerdoMode = 'over';
        } else {
          this.sidenavEsquerdoMode = 'side';
          this.sidenavDireitoAberto = true;
        }
      });
  }

  ngOnInit() {
  }

  fecharSidenavEsquerdo() {
    if (this.activeMediaQuery === 'xs') {
      this.sidenavEsquerdoAberto = false;
    }
  }

}
