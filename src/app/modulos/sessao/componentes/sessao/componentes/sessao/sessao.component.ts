/// <reference types="@types/dom-mediacapture-record" />
import { ARTEFATO_TIPO } from './../../../../../../constantes/artefato-tipo';
import { Agendamento } from './../../../../../atendimentos/interfaces/agendamento.interface';
import { Subscription } from 'rxjs';
import {
  DialogConfigDiaAtendimentoComponent
} from './../../../../../compartilhado/componentes/dialog-config-dia-atendimento/dialog-config-dia-atendimento.component';
import { DiaAtendimento } from './../../../../../atendimentos/interfaces/dia-atendimento.interface';
import { AtendimentoConfiguracao } from './../../../../../atendimentos/interfaces/atendimento-configuracao.interface';
import { Router } from '@angular/router';
import { FinalizarSessaoComponent, FinalizarSessaoDados } from './../finalizar-sessao/finalizar-sessao.component';
import { MatBottomSheet, MatDialog, MatChip } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import {
  BottomSheetNavegacaoComponent
} from '../../../../../compartilhado/componentes/bottom-sheet-navegacao/bottom-sheet-navegacao.component';
import { CurrencyMaskConfig } from 'ng2-currency-mask/src/currency-mask.config';

moment.locale('pt-BR');

@Component({
  selector: 'app-sessao',
  templateUrl: './sessao.component.html',
  styleUrls: ['./sessao.component.scss']
})
export class SessaoComponent implements OnInit {

  dialogSubscription: Subscription;
  moedaOptions: CurrencyMaskConfig;

  qtdSessoes: number;
  tempoSessao: number;

  countDown: string;
  counter: number;
  limite: number;
  interval;
  parado: boolean;
  extrapolou: boolean;

  agendamento: Agendamento =
    {
      agendamento_id: 1,
      agendamento_data: new Date().toISOString(),
      hora_inicio_sessao: '1000',
      tempo_sessao: 45,
      quantidade_sessoes: 2,
      paciente_id: 1,
      atendimento_id: 1
    };
  diaAtendimentoSelecionado: DiaAtendimento;
  novoDiaAtendimento: DiaAtendimento;
  configuracaoAtendimentoSalva: AtendimentoConfiguracao = {
    valor_sessao: 80.00,
    atendimento_dias: [
      { id: 6, diaSemana: 6, hora: '100000', qtdSessoes: 2, duracao: 45 },
      { id: 7, diaSemana: 1, hora: '1000', qtdSessoes: 2, duracao: 45 },
      // { id: 8, diaSemana: 0, hora: '1000', qtdSessoes: 2, duracao: 45 },
      // { id: 9, diaSemana: 3, hora: '1000', qtdSessoes: 2, duracao: 45 },
      // { id: 1, diaSemana: 5, hora: '1000', qtdSessoes: 2, duracao: 45 },
      // { id: 2, diaSemana: 4, hora: '1000', qtdSessoes: 2, duracao: 45 },
      // { id: 3, diaSemana: 2, hora: '1000', qtdSessoes: 2, duracao: 45 }
    ]
  };
  mensagemConfiguracao: string;
  prontoParaComecar: boolean;
  valorSessao: number;

  tipoArtefatoAdd: number;

  constructor(public bottomSheet: MatBottomSheet
    , public dialog: MatDialog
    , private router: Router) {
    this.counter = 0;
    this.parado = true;
    this.extrapolou = false;
    this.prontoParaComecar = false;
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
    this.countDown = '00:00:00';
    this.prepararConfiguracao();
    this.tipoArtefatoAdd = 0;
  }

  prepararConfiguracao() {
    if (this.agendamento) {
      this.mensagemConfiguracao =
        'Existe um agendamento para esta sessão. Clique na configuração para alterar ou selecione a de outro dia.';
      this.novoDiaAtendimento = {
        id: null,
        diaSemana: moment(this.agendamento.agendamento_data).weekday(),
        hora: this.agendamento.hora_inicio_sessao,
        qtdSessoes: this.agendamento.quantidade_sessoes,
        duracao: this.agendamento.tempo_sessao,
        selecionado: true
      };
      this.diaAtendimentoSelecionado = this.novoDiaAtendimento;
      this.chipSelecao(this.diaAtendimentoSelecionado);
      this.configuracaoAtendimentoSalva.atendimento_dias.sort(this.ordenarChips);
    } else if (this.configuracaoAtendimentoSalva.atendimento_dias && this.configuracaoAtendimentoSalva.atendimento_dias.length) {
      const diaAtendimento = this.configuracaoParaHoje(this.configuracaoAtendimentoSalva.atendimento_dias);
      if (diaAtendimento) {
        diaAtendimento.selecionado = true;
        this.mensagemConfiguracao = 'Utilize a configuração salva ou crie uma nova.';
      } else {
        this.mensagemConfiguracao = 'Não foi encontrada uma configuração para hoje. Utilize a de outro dia ou crie uma nova.';
        this.diaAtendimentoSelecionado = null;
      }
      this.configuracaoAtendimentoSalva.atendimento_dias.sort(this.ordenarChips);
    } else {
      this.mensagemConfiguracao = 'Não existe nenhuma configuração salva, crie uma nova';
      this.diaAtendimentoSelecionado = null;
    }
    this.valorSessao = this.configuracaoAtendimentoSalva.valor_sessao;
  }

  atualizarTempo() {
    this.countDown = moment().hours(0).minutes(0).seconds(this.counter++).format('HH:mm:ss');
    this.extrapolou = this.counter > this.limite;
  }

  ordenarChips = (a: DiaAtendimento, b: DiaAtendimento) =>
    (a.selecionado === true || a.diaSemana < b.diaSemana) ? -1 : 1

  iniciar() {
    this.parado = false;
    if (this.counter === 0) {
      this.countDown = '00:00:00';
    }
    this.interval = setInterval(() => this.atualizarTempo(), 1000);
  }

  pausar() {
    this.parado = true;
    clearInterval(this.interval);
  }

  parar() {
    this.parado = true;
    clearInterval(this.interval);
    setTimeout(() => {
      this.interval = null;
      this.finalizar();
    }, 500);
  }

  aplicarConfiguracoes() {
    this.limite = this.diaAtendimentoSelecionado.duracao * this.diaAtendimentoSelecionado.qtdSessoes * 60;
    this.prontoParaComecar = true;
    this.tipoArtefatoAdd = null;
  }

  adicionarArtefato() {
    const bottomSheetRef = this.bottomSheet.open(BottomSheetNavegacaoComponent, {
      data: [
        { tipo: ARTEFATO_TIPO.nota, icon: 'note_add', texto: 'NOTA' },
        { tipo: ARTEFATO_TIPO.imagem, icon: 'add_a_photo', texto: 'FOTO OU VÍDEO' },
        { tipo: ARTEFATO_TIPO.audio, icon: 'mic', texto: 'ÁUDIO' },
        { tipo: ARTEFATO_TIPO.avaliacao, icon: 'assessment', texto: 'AVALIAÇÃO' },
        { tipo: ARTEFATO_TIPO.anamnese, icon: 'assignment_ind', texto: 'ANAMNESE' },
      ],
      closeOnNavigation: true
    });
    bottomSheetRef.afterDismissed().subscribe(resultado => this.tipoArtefatoAdd = resultado);
  }

  finalizar() {
    const sessaoQuantidade = this.counter < this.diaAtendimentoSelecionado.duracao
      ? 1
      : Math.round(this.counter / (this.diaAtendimentoSelecionado.duracao * 60));
    const data: FinalizarSessaoDados = {
      sessao_id: 1,
      sessao_duracao: this.countDown,
      sessao_quantidade: sessaoQuantidade,
      sessao_data: new Date().toISOString(),
      sessao_responsavel: 'Abhner Araujo',
      sessao_email_responsavel: 'abhnerfelipe@gmail.com',
      sessao_envia_email_responsavel: true,
      sessao_orientacoes: 'Treinar mais o /k/ durante a semana.',
      sessao_valor: 80 * sessaoQuantidade,
      sessao_paga: false
    };
    const dialogRef = this.dialog.open(FinalizarSessaoComponent, {
      data,
      minWidth: 320
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.router.navigate(['/atendimentos/1/sessoes']);
      }
    });
  }

  configuracaoParaHoje = (dias: DiaAtendimento[]) => dias.find(dia => dia.diaSemana === moment().weekday());

  chipSelecao(dia: DiaAtendimento) {
    this.configuracaoAtendimentoSalva.atendimento_dias.forEach(outroDia => {
      if (outroDia.id !== dia.id) {
        outroDia.selecionado = false;
      } else {
        dia.selecionado = !dia.selecionado;
        this.novoDiaAtendimento.selecionado = false;
        this.diaAtendimentoSelecionado = dia;
      }
    });
  }

  novaConfiguracaoDia() {
    const dialogRef = this.dialog.open(DialogConfigDiaAtendimentoComponent, {
      data: {
        id: null,
        diaSemana: moment().weekday(),
        hora: moment().format('LT'),
        qtdSessoes: 1,
        duracao: 40,
        travarBotoes: true
      }
    });
    this.dialogSubscription = dialogRef.afterClosed().subscribe((resultado: DiaAtendimento) => {
      if (resultado) {
        this.novoDiaAtendimento = resultado;
        this.novoDiaAtendimento.selecionado = true;
        this.diaAtendimentoSelecionado = this.novoDiaAtendimento;
        this.chipSelecao(this.novoDiaAtendimento);
      }
    });
  }

}
