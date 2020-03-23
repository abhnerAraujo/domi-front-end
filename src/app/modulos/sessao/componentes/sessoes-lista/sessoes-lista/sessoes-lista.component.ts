import { TimeLineItem, TimeLineConfig } from './../../../../compartilhado/componentes/timeline/componentes/timeline/timeline.component';
import { MoedaPipe } from './../../../../../pipes/moeda/moeda.pipe';
import { SessaoService } from './../../../services/sessao/sessao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MomentService } from './../../../../compartilhado/services/moment/moment.service';
import { CORES } from './../../../../../constantes/valores';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Sessao, ResumoPagamentoSessao } from '../../../interfaces';

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
  mostrarGraficos: boolean;

  sessoes: Sessao[];
  pagamentos: ResumoPagamentoSessao[];
  carregando: boolean;

  dataDonut: any;
  optionsDonut: any;
  dataLinha: any;
  optionsLinha: any;

  constructor(
    private moment: MomentService,
    private router: Router,
    private route: ActivatedRoute,
    private sessaoService: SessaoService,
    private moedaPipe: MoedaPipe,
    public location: Location) {
    this.atendimentoId = Number.parseInt(this.route.snapshot.params.id_atendimento, 10);
    this.timeLineConfig = {
      cores: {
        principal: CORES.primaria,
        secundaria: CORES.acento_dark,
        inicio: CORES.acento,
        linha: ''
      },
      descendente: true,
      mensagemVazio: 'Nenhuma sessão realizada',
      mostrarData: true,
      clicavel: true
    };
    this.mostrarGraficos = false;
  }

  carregarLista() {
    this.carregando = true;
    this.sessaoService.sessoes(this.atendimentoId)
      .subscribe(
        resultado => {
          this.sessoes = resultado.dados;
          if (this.sessoes && this.sessoes.length) {
            this.carregarTimeLine();
            this.resumoPagamentos();
            this.carregarGraficoEvolucao();
          }
        },
        error => console.log(error),
        () => this.carregando = false);
  }

  ngOnInit() {
    this.carregarLista();
  }

  resumoPagamentos() {
    this.sessaoService.resumoPagamentos(this.atendimentoId)
      .subscribe(resultado => {
        this.pagamentos = resultado.dados;
        this.carregarValores();
      });
  }

  async carregarValores() {
    this.totalPago = 0;
    this.totalSessoes = 0;
    this.total = 0;
    this.pagamentos.forEach(pagamento => {
      this.totalPago += Number.parseFloat(pagamento.valor_pago);
      this.total += Number.parseFloat(pagamento.valor_total_sessao);
    });
    this.totalSessoes = this.sessoes.length;

    this.carregarGraficoFinanceiro();
    this.mostrarGraficos = true;
  }

  async carregarTimeLine() {
    this.timeLine = this.sessoes.map((sessao, index) => {
      const item = {
        id: sessao.sessao_id,
        titulo: `${index + 1}ª sessão`,
        data: sessao.sessao_data,
        // descricao: `${this.moment.momento().duration()}`
        descricao: 'Em andamento'
      };
      if (sessao.hora_fim) {
        item.descricao = `${this.moment.momentBr(sessao.hora_inicio).format('LT')} - ${this.moment.momentBr(sessao.hora_fim).format('LT')}`;
      }
      return item;
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
          fill: true,
          borderColor: CORES.primaria
        }
      ]
    };
    this.optionsLinha = {
      scales: {
        xAxes: [
          {
            // ticks: {
            //   display: false
            // },
            gridLines: {
              color: 'rgba(0, 0, 0, 0)',
              display: false,
              drawBorder: false
            }
          }],
        yAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
            maxTicksLimit: 6,
            suggestedMax: 10,
          },
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
            display: false,
            drawBorder: false
          }
        }]
      }
    };
    let ultimoIndicador = 0;
    this.sessoes.forEach((sessao, index) => {
      this.dataLinha.labels.push(`${index + 1}ª sessão`);
      if (sessao.nota_geral) {
        ultimoIndicador = sessao.nota_geral;
      }
      this.dataLinha.datasets[0].data.push(ultimoIndicador);
    });
  }

  sessaoResumo(item: TimeLineItem) {
    this.router.navigate([`/atendimentos/${this.atendimentoId}/sessoes/${item.id}`]);
  }

}
