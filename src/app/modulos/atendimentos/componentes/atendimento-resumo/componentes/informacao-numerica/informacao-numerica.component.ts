import { CountUpOptions } from 'countup.js';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-informacao-numerica',
  templateUrl: './informacao-numerica.component.html',
  styleUrls: ['./informacao-numerica.component.scss']
})
export class InformacaoNumericaComponent implements OnInit {

  @Input() sessoes: number;
  @Input() recebido: number;
  @Input() receber: number;

  countUpOptionsMoeda: CountUpOptions = {
    decimalPlaces: 2,
    useGrouping: true,
    separator: '.',
    decimal: ',',
    prefix: 'R$ '
  };

  countUpOptions: CountUpOptions = {
    useGrouping: true,
    separator: '.'
  };

  constructor() { }

  ngOnInit() {
  }

}
