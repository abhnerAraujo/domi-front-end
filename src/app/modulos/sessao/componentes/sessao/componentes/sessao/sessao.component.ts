import { FinalizarSessaoComponent } from './../finalizar-sessao/finalizar-sessao.component';
import { DURACAO_SNACKBAR } from './../../../../../../constantes/config';
import { SessaoService } from './../../../../services/sessao/sessao.service';
import { MomentService } from './../../../../../compartilhado/services/moment/moment.service';
import { AtendimentosService } from './../../../../../atendimentos/services/atendimentos/atendimentos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Artefato } from './../../../../interfaces/atividade.interface';
import { ARTEFATO_TIPO, ARTEFATO_TIPO_DESCRICAO } from './../../../../../../constantes/artefato-tipo';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatBottomSheet, MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import {
  BottomSheetNavegacaoComponent
} from '../../../../../compartilhado/componentes/bottom-sheet-navegacao/bottom-sheet-navegacao.component';
import { CurrencyMaskConfig } from 'ng2-currency-mask/src/currency-mask.config';
import { Sessao } from 'src/app/modulos/sessao/interfaces';
import { Moment } from 'moment';
import { FinalizarSessaoDados } from '../finalizar-sessao/finalizar-sessao.component';


@Component({
  selector: 'app-sessao',
  templateUrl: './sessao.component.html',
  styleUrls: ['./sessao.component.scss']
})
export class SessaoComponent implements OnInit {

  dialogSubscription: Subscription;
  moedaOptions: CurrencyMaskConfig;
  interval;
  sessaoForm: FormGroup;
  atividades: Artefato[];
  timeline: any[];
  sessao: Sessao;
  agoraServidor: Moment;

  parado: boolean;
  extrapolou: boolean;
  carregando: boolean;
  prontoParaComecar: boolean;

  countDown: string;
  novaNota: string;

  counter: number;
  limite: number;
  valorSessao: number;
  tipoArtefatoAdd: number;
  atendimentoId: number;
  sessaoId: number;

  constructor(
    public bottomSheet: MatBottomSheet
    , public dialog: MatDialog
    , private router: Router
    , fb: FormBuilder
    , private route: ActivatedRoute
    , private atendimentoService: AtendimentosService
    , private sessaoService: SessaoService
    , private moment: MomentService
    , private snackbar: MatSnackBar) {
    this.counter = 0;
    this.parado = true;
    this.extrapolou = false;
    this.prontoParaComecar = false;
    this.sessaoForm = fb.group({
      duracao: [1, Validators.compose([Validators.required])],
      quantidade: [45, Validators.compose([Validators.required])],
      valor_padrao: [100],
    });
    this.carregando = true;
  }

  ngOnInit() {
    this.atendimentoId = Number.parseInt(this.route.snapshot.params.id_atendimento, 10);
    this.sessaoId = Number.parseInt(this.route.snapshot.params.id_sessao, 10);
    this.countDown = '00:00:00';
    this.prepararConfiguracao();
    if (this.sessaoId) {
      this.dadosSessao();
    }
    this.tipoArtefatoAdd = 0;
  }

  prepararConfiguracao() {
    this.atendimentoService.configuracoes(this.atendimentoId)
      .subscribe(
        r => {
          const diaHoje = this.moment.momentBr().weekday();
          const configuracaoHoje = r.dados.dias.find(dia => dia.dia_semana === diaHoje);
          if (configuracaoHoje) {
            this.sessaoForm.patchValue({
              quantidade: configuracaoHoje.quantidade,
              duracao: configuracaoHoje.duracao,
              valor: r.dados.valor_padrao
            });
          }
        },
        e => this.snackbar.open(e.error.mensagem, 'Ok', { duration: DURACAO_SNACKBAR }),
        () => this.carregando = false
      );
  }

  private dadosSessao() {
    this.sessaoService.sessao(this.atendimentoId, this.sessaoId)
      .subscribe(
        r => {
          this.sessao = r.dados[0];
          this.limite = this.sessao.duracao * this.sessao.quantidade * 60;
          this.prontoParaComecar = true;
          this.tipoArtefatoAdd = null;
          if (this.sessao.hora_fim) {
            this.router.navigate([`atendimentos/${this.atendimentoId}/sessoes/${this.sessaoId}/resumo`]);
          }
          if (this.sessao.hora_inicio) {
            this.iniciar();
          }
        },
        e => this.snackbar.open(e.error.mensagem || 'Não foi possível carregar a sessão', 'Ok', { duration: DURACAO_SNACKBAR }),
        () => this.carregando = false
      );
  }

  atualizarTempo() {
    this.countDown = this.moment.momentBr().hours(0).minutes(0).seconds(this.counter++).format('HH:mm:ss');
    this.extrapolou = this.counter > this.limite;
  }

  iniciar() {
    this.sessaoService.iniciar(this.atendimentoId, this.sessaoId)
      .subscribe(
        r => {
          this.agoraServidor = this.moment.momentBr(r.dados.agora);
          this.sessao.hora_inicio = r.dados.hora_inicio;
          this.sessao.tempo_corrido = r.dados.tempo_corrido;

          this.parado = false;
          this.counter = this.sessao.tempo_corrido;

          if (this.counter === 0) {
            this.atividades = [{ id: 1, tipo: 'Início do Atendimento', tipo_id: null, data_criacao: new Date().toISOString() }];
            this.countDown = '00:00:00';
            this.atualizarTimeLine();
          }
          this.interval = setInterval(() => this.atualizarTempo(), 1000);
          // this.criarArtefatoAleatorio();
        },
        e => this.snackbar.open(e.error.mensagem || 'Não foi possível iniciar a sessão', 'Ok', { duration: DURACAO_SNACKBAR })
      );

  }

  pausar() {
    this.sessaoService.pausar(this.atendimentoId, this.sessaoId, this.counter)
      .subscribe(
        r => this.snackbar.open('Pausado!', 'Ok', { duration: DURACAO_SNACKBAR })
      );
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
    const dados = this.sessaoForm.value;
    this.sessaoService.salvar(this.atendimentoId, dados)
      .subscribe(
        r => this.router.navigate([`atendimentos/${this.atendimentoId}/sessoes/${r.sessao_id}`]),
        e => this.snackbar.open(e.error.mensagem || 'Ocorreu um erro ao criar sessão', 'Ok', { duration: DURACAO_SNACKBAR }),
        () => this.carregando = false);

  }

  tempoTotal = () => {
    const duracao: number = this.sessaoForm.get('duracao').value;
    const quantidade: number = this.sessaoForm.get('quantidade').value;
    const totalEmMilli = (duracao * quantidade) * 60 * 1000;
    const inicial = this.moment.momentBr().set({ hour: 0, minute: 0, second: 0 });
    const formato = (quantidade * duracao) >= 60 ? 'H[h] mm[m]' : 'mm [min(s)]';
    return inicial.millisecond(totalEmMilli).format(formato);
  }

  fimDaSessao = () => {
    const duracao: number = this.sessaoForm.get('duracao').value;
    const quantidade: number = this.sessaoForm.get('quantidade').value;
    const totalEmMilli = (duracao * quantidade) * 60 * 1000;
    return this.moment.momentBr().add(totalEmMilli, 'millisecond').format('LT');
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
    const sessaoQuantidade = this.counter < (this.sessao.duracao * 60)
      ? 1
      : Math.round(this.counter / (this.sessao.duracao * 60));
    const data: FinalizarSessaoDados = {
      sessao_id: this.sessao.sessao_id,
      sessao_duracao: this.countDown,
      sessao_quantidade: sessaoQuantidade,
      sessao_data: this.sessao.sessao_data,
      sessao_responsavel: '',
      sessao_email_responsavel: '',
      sessao_envia_email_responsavel: false,
      sessao_orientacoes: '',
      sessao_valor: this.sessaoForm.value.valor_padrao * sessaoQuantidade,
      sessao_paga: false
    };

    const dialogRef = this.dialog.open(FinalizarSessaoComponent, {
      disableClose: true,
      data,
      minWidth: 320
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.router.navigate(['/atendimentos/1/sessoes']);
      }
    });
  }

  criarArtefatoAleatorio() {
    setInterval(() => {
      const randomTimes = Math.floor(Math.random() * 4) + 1;
      const dataHora = new Date().toISOString();
      for (let i = 0; i < randomTimes; i++) {
        const random = Math.floor(Math.random() * 4) + 1;
        this.atividades.push({
          id: this.atividades.length + 1,
          tipo_id: random,
          tipo: ARTEFATO_TIPO_DESCRICAO[random],
          data_criacao: dataHora
        });
        this.atualizarTimeLine();
      }
    }, 60000);
  }

  atualizarTimeLine() {
    const group = this.atividades.reduce(
      (entryMap, e) => entryMap.set(this.moment.momentBr(e.data_criacao).format('LT'),
        [...entryMap.get(this.moment.momentBr(e.data_criacao).format('LT')) || [], e]),
      new Map()
    );
    this.timeline = Array.from(group.entries());
  }

}
