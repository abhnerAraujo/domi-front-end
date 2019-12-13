import { Router, ActivatedRoute } from '@angular/router';
import { MomentService } from './../../../../compartilhado/services/moment/moment.service';
import { CORES } from './../../../../../constantes/valores';
import { Component, OnInit } from '@angular/core';
import { TimeLineItem, TimeLineConfig } from 'src/app/modulos/compartilhado/componentes/timeline/componentes/timeline/timeline.component';

@Component({
  selector: 'app-sessoes-lista',
  templateUrl: './sessoes-lista.component.html',
  styleUrls: ['./sessoes-lista.component.scss']
})
export class SessoesListaComponent implements OnInit {

  totalPago: number;
  total: number;
  totalSessoes: number;
  timeLine: TimeLineItem[];
  timeLineConfig: TimeLineConfig;
  atendimentoId: number;

  data: any;
  options: any;

  constructor(private moment: MomentService, private router: Router, private route: ActivatedRoute) {
    this.atendimentoId = Number.parseInt(this.route.snapshot.params.id_atendimento, 10);
    this.timeLineConfig = {
      cores: {
        principal: CORES.primaria,
        secundaria: CORES.acento_dark,
        inicio: CORES.acento,
        linha: ''
      },
      descendente: true,
      height: 100,
      mensagemVazio: 'Nenhuma sessão realizada',
      mostrarData: true
    };
    this.timeLine = [
      {
        id: null,
        titulo: 'Início do atendimento', data: new Date().toISOString(),
        descricao: ''
      },
      {
        id: 1,
        titulo: '1ª sessão',
        data: this.moment.momentBr(new Date().toISOString()).subtract(1, 'days').toISOString(),
        descricao: 'R$ 80.00'
      },
      {
        id: 2,
        titulo: '2ª sessão',
        data: this.moment.momentBr(new Date().toISOString()).subtract(2, 'days').toISOString(),
        descricao: 'R$ 80.00'
      },
      {
        id: 3,
        titulo: '3ª sessão',
        data: this.moment.momentBr(new Date().toISOString()).subtract(3, 'days').toISOString(),
        descricao: 'R$ 80.00'
      },
      {
        id: 4,
        titulo: '4ª sessão',
        data: this.moment.momentBr(new Date().toISOString()).subtract(4, 'days').toISOString(),
        descricao: 'R$ 80.00'
      },
      {
        id: 5,
        titulo: '5ª sessão',
        data: this.moment.momentBr(new Date().toISOString()).subtract(5, 'days').toISOString(),
        descricao: 'R$ 80.00'
      },
    ];
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

  sessaoResumo(item: TimeLineItem) {
    this.router.navigate([`/atendimentos/${this.atendimentoId}/sessoes/${item.id}`]);
  }

}
