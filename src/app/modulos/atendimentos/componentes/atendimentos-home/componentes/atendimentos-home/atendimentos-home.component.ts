import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-atendimentos-home',
  templateUrl: './atendimentos-home.component.html',
  styleUrls: ['./atendimentos-home.component.scss']
})
export class AtendimentosHomeComponent implements OnInit {

  constructor(public location: Location) { }

  ngOnInit() {
  }

}
