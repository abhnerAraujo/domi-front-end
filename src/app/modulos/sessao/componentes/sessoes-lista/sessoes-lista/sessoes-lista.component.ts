import { CORES } from './../../../../../constantes/valores';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sessoes-lista',
  templateUrl: './sessoes-lista.component.html',
  styleUrls: ['./sessoes-lista.component.scss']
})
export class SessoesListaComponent implements OnInit {

  totalPago: number;
  total: number;
  totalSessoes: number;

  data: any;
  options: any;

  constructor() {

  }

  ngOnInit() {
    this.total = 1040.00;
    this.totalPago = 800.00;
    this.totalSessoes = 13;
    this.carregarGrafico();
  }

  carregarGrafico() {
    this.options = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      cutoutPercentage: 80
    };
    this.data = {
      labels: ['Total pago', 'A receber'],
      datasets: [
        {
          data: [this.totalPago, this.total - this.totalPago],
          backgroundColor: [
            CORES.acento_dark,
            CORES.acento_light
          ],
          hoverBackgroundColor: [
            CORES.acento_dark,
            CORES.acento_light
          ]
        }],
    };
  }

}
