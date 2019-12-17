import { MoedaPipe } from './../../../../../pipes/moeda/moeda.pipe';
import { SessaoService } from './../../../services/sessao/sessao.service';
import { Sessao } from './../../../interfaces/sessao-lista-response.interface';
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

  sessoes: Sessao[];
  carregando: boolean;

  dataDonut: any;
  optionsDonut: any;
  dataLinha: any;

  constructor(
    private moment: MomentService,
    private router: Router,
    private route: ActivatedRoute,
    private sessaoService: SessaoService,
    private moedaPipe: MoedaPipe) {
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
      mostrarData: true,
      clicavel: true
    };
  }

  carregarLista() {
    this.sessoes = this.sessaoService.sessoes();
  }

  ngOnInit() {
    this.carregando = true;
    this.carregarLista();
    if (this.sessoes) {
      this.carregarValores();
      this.carregarGraficoFinanceiro();
      this.carregarGraficoEvolucao();
      this.carregarTimeLine();
    }
    this.carregando = false;
  }

  carregarValores() {
    this.totalPago = 0;
    this.totalSessoes = 0;
    this.total = 0;
    this.sessoes.forEach(sessao => {
      this.totalPago += sessao.valor_pago;
      this.total += sessao.sessao_valor;
    });
    this.totalSessoes = this.sessoes.length;
  }

  carregarTimeLine() {
    this.timeLine = this.sessoes.map((sessao, index) => {
      return {
        id: sessao.sessao_id,
        titulo: `${index + 1}ª sessão`,
        data: sessao.sessao_data,
        descricao: `${this.moedaPipe.transform(sessao.sessao_valor, true)}`
      };
    });
  }

  carregarGraficoFinanceiro() {
    this.optionsDonut = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      cutoutPercentage: 80
    };
    this.dataDonut = {
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

  carregarGraficoEvolucao() {
    this.dataLinha = {
      labels: [],
      datasets: [
        {
          label: 'Evolução',
          data: [],
          fill: false,
          borderColor: CORES.primaria
        }
      ]
    };
    let ultimoIndicador = 0;
    this.sessoes.forEach((sessao, index) => {
      this.dataLinha.labels.push(`${index + 1}ª sessão`);
      if (sessao.evolucao) {
        ultimoIndicador = sessao.evolucao.indicador;
      }
      this.dataLinha.datasets[0].data.push(ultimoIndicador);
    });
  }

  sessaoResumo(item: TimeLineItem) {
    this.router.navigate([`/atendimentos/${this.atendimentoId}/sessoes/${item.id}`]);
  }

}
