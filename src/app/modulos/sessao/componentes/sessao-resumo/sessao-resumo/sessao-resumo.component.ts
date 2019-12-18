import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sessao-resumo',
  templateUrl: './sessao-resumo.component.html',
  styleUrls: ['./sessao-resumo.component.scss']
})
export class SessaoResumoComponent implements OnInit {

  constructor(public location: Location) { }

  ngOnInit() {
  }

}
