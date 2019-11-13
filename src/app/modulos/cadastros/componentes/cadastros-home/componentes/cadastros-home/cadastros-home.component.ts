import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastros-home',
  templateUrl: './cadastros-home.component.html',
  styleUrls: ['./cadastros-home.component.scss']
})
export class CadastrosHomeComponent implements OnInit {

  constructor(public local: Location) { }

  ngOnInit() {
  }

}
