import { MomentService } from './../../../../../compartilhado/services/moment/moment.service';
import { DURACAO_SNACKBAR } from './../../../../../../constantes/config';
import { ConfiguracaoAtendimento } from './../../../../interfaces/atendimento-configuracoes.interface';
import { AtendimentosService } from './../../../../services/atendimentos/atendimentos.service';
import { ActivatedRoute } from '@angular/router';
import {
  DialogConfigDiaAtendimentoComponent
} from '../../../../../compartilhado/componentes/dialog-config-dia-atendimento/dialog-config-dia-atendimento.component';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CurrencyMaskConfig } from 'ng2-currency-mask/src/currency-mask.config';
import { DiaAtendimento } from '../../../../interfaces/dia-atendimento.interface';
import { Moment } from 'moment';

@Component({
  selector: 'app-atendimento-configuracao',
  templateUrl: './atendimento-configuracao.component.html',
  styleUrls: ['./atendimento-configuracao.component.scss']
})
export class AtendimentoConfiguracaoComponent implements OnInit {

  diasAtendimento: DiaAtendimento[];
  dias: ConfiguracaoAtendimento[];
  valorSessao: number;
  moedaOptions: CurrencyMaskConfig;
  atendimentoId: number;

  constructor(
    public location: Location,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private atendimentoService: AtendimentosService,
    private snackbar: MatSnackBar,
    public momentService: MomentService) {
    this.moedaOptions = {
      align: 'left',
      allowNegative: true,
      decimal: ',',
      thousands: '.',
      prefix: 'R$ ',
      suffix: '',
      precision: 2,
    };
  }


  ngOnInit() {
    this.atendimentoId = Number.parseInt(this.route.snapshot.params.id_atendimento, 10);
    this.carregarConfiguracoes();
    this.diasAtendimento = [];
    this.diasAtendimento.push(
      { id: 1, diaSemana: 1, hora: '10:00', qtdSessoes: 2, duracao: 45 },
    );
  }

  async carregarConfiguracoes() {
    this.atendimentoService.configuracoes(this.atendimentoId)
      .subscribe(
        resultado => {
          this.dias = resultado.dados.dias;
          this.valorSessao = resultado.dados.valor_padrao;
          this.carregaDuracaoSessoes();
        },
        erro => this.snackbar.open(erro.mensagem || 'Ocorreu um erro ao listar configurações', 'Ok', { duration: DURACAO_SNACKBAR })
      );
  }

  private carregaDuracaoSessoes() {
    this.dias.forEach(dia => {
      dia.sessoes = [];
      for (let i = 0; i < dia.quantidade; i++) {
        const horaInicio = this.momentService.momentBr(dia.hora_inicio).add(i * dia.duracao, 'minute');
        const horaFim = this.momentService.momentBr(horaInicio).add(dia.duracao, 'minute');
        dia.sessoes.push({
          hora_inicio: horaInicio.format('LT'),
          hora_fim: horaFim.format('LT')
        });
      }
    });
  }

  abrirDialog(index: number) {
    let dados: DiaAtendimento = {
      id: null,
      diaSemana: null,
      hora: null,
      qtdSessoes: null,
      duracao: null
    };
    if (index >= 0) {
      dados = this.diasAtendimento[index];
    }
    const dialogRef = this.dialog.open(DialogConfigDiaAtendimentoComponent, {
      data: dados
    });
    dialogRef.afterClosed().subscribe((retorno: DiaAtendimento) => {
      if (retorno) {
        if (retorno.id) {
          this.diasAtendimento[index] = retorno;
        } else {
          retorno.id = (this.diasAtendimento.length + 1) || 1;
          this.diasAtendimento.push(retorno);
        }
      }
    });
  }

  alterarValor() {
    this.atendimentoService.valorPadrao(this.atendimentoId, `${this.valorSessao * 100}`)
      .subscribe(
        resultado => this.snackbar.open(resultado.mensagem, 'Ok', { duration: DURACAO_SNACKBAR }),
        erro => this.snackbar.open(erro.mensagem || 'Ocorreu um erro inesperado :(', 'Ok', { duration: DURACAO_SNACKBAR })
      );
  }

}
