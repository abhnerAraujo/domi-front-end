import { Atendimento } from './../../../../interfaces/detalhar-atendimento.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  atendimentoForm: FormGroup;
  valorSessao: number;
  moedaOptions: CurrencyMaskConfig;
  atendimentoId: number;
  atendimento: Atendimento;

  constructor(
    public location: Location,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private atendimentoService: AtendimentosService,
    private snackbar: MatSnackBar,
    public momentService: MomentService,
    fb: FormBuilder) {
    this.moedaOptions = {
      align: 'left',
      allowNegative: true,
      decimal: ',',
      thousands: '.',
      prefix: 'R$ ',
      suffix: '',
      precision: 2,
    };
    this.atendimentoForm = fb.group({
      valor_padrao: [100],
      diagnostico: [null, Validators.compose([Validators.maxLength(255)])],
      hipotese_diagnostica_especifica: [null, Validators.compose([Validators.maxLength(255)])],
      queixa: [null, Validators.compose([Validators.maxLength(255)])]
    });
  }

  ngOnInit() {
    this.atendimentoId = Number.parseInt(this.route.snapshot.params.id_atendimento, 10);
    this.carregarConfiguracoes();
    this.carregarAtendimento();
  }

  async carregarAtendimento() {
    this.atendimentoService.detalhar(this.atendimentoId)
      .subscribe(
        r => this.atendimento = r.dados[0],
        e => this.snackbar.open(e.error.mensagem, 'Ok', { duration: DURACAO_SNACKBAR }),
        () => this.atendimentoForm.patchValue(this.atendimento)
      );
  }

  async carregarConfiguracoes() {
    this.atendimentoService.configuracoes(this.atendimentoId)
      .subscribe(
        resultado => {
          this.dias = resultado.dados.dias;
          this.valorSessao = resultado.dados.valor_padrao;
          this.carregaDuracaoSessoes();
          this.dias.sort((a, b) => (a.dia_semana > b.dia_semana) ? 1 : (a.dia_semana === b.dia_semana) ? 0 : -1);
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

  abrirDialog(dia: ConfiguracaoAtendimento) {
    const dados: DiaAtendimento = {
      id: null,
      diaSemana: null,
      hora: null,
      qtdSessoes: null,
      duracao: null
    };
    if (dia) {
      dados.id = dia.atendimento_configuracao_id;
      dados.diaSemana = dia.dia_semana;
      dados.hora = this.momentService.momentBr(dia.hora_inicio).format('LT');
      dados.qtdSessoes = dia.quantidade;
      dados.duracao = dia.duracao;
    }
    const dialogRef = this.dialog.open(DialogConfigDiaAtendimentoComponent, {
      minWidth: 320,
      data: dados
    });
    dialogRef.afterClosed().subscribe((retorno: DiaAtendimento) => {
      if (retorno) {
        const hora = retorno.hora.split(':')[0];
        const minutos = retorno.hora.split(':')[1];
        const config: ConfiguracaoAtendimento = {
          atendimento_configuracao_id: retorno.id,
          atendimento: 0,
          dia_semana: retorno.diaSemana,
          duracao: retorno.duracao,
          hora_inicio: this.momentService.momentBr()
            .set({ hour: Number.parseInt(hora, 10), minute: Number.parseInt(minutos, 10), second: 0 })
            .toISOString(),
          quantidade: retorno.qtdSessoes,
        };

        if (config.atendimento_configuracao_id) {
          this.atendimentoService.editarConfiguracao(this.atendimentoId, config)
            .subscribe(r => this.snackbar.open(r.mensagem, 'Ótimo', { duration: DURACAO_SNACKBAR }),
              erro => this.snackbar.open(erro.mensagem, 'Ok', { duration: DURACAO_SNACKBAR }),
              () => this.carregarConfiguracoes());
        } else {
          this.atendimentoService.criarConfiguracao(this.atendimentoId, config)
            .subscribe(r => this.snackbar.open(r.mensagem, 'Ótimo', { duration: DURACAO_SNACKBAR }),
              erro => this.snackbar.open(erro.mensagem, 'Ok', { duration: DURACAO_SNACKBAR }),
              () => this.carregarConfiguracoes());
        }
        this.carregarConfiguracoes();
      }
    });
  }

  alterarValor(campo?: string) {
    if (campo === 'valor_padrao' && this.atendimentoForm.get('valor_padrao').value === this.atendimento.valor_padrao) {
      return false;
    }
    if (this.atendimentoForm.valid) {
      const formValue = this.atendimentoForm.value;
      this.atendimento.queixa = formValue.queixa;
      this.atendimento.valor_padrao = formValue.valor_padrao * 100;
      this.atendimento.diagnostico = formValue.diagnostico;
      this.atendimento.hipotese_diagnostica_especifica = formValue.hipotese_diagnostica_especifica;
      this.atendimentoService.editar(this.atendimentoId, this.atendimento)
        .subscribe(
          resultado => this.snackbar.open(resultado.mensagem, 'Ok', { duration: DURACAO_SNACKBAR }),
          erro => this.snackbar.open(erro.mensagem || 'Ocorreu um erro inesperado :(', 'Ok', { duration: DURACAO_SNACKBAR })
        );
    }
  }

  excluir(dia: ConfiguracaoAtendimento) {
    this.atendimentoService.excluirConfiguracao(this.atendimentoId, dia.atendimento_configuracao_id)
      .subscribe(
        r => this.snackbar.open(r.mensagem, 'Ótimo', { duration: DURACAO_SNACKBAR }),
        e => this.snackbar.open(e.mensagem, 'Ok', { duration: DURACAO_SNACKBAR }),
        () => this.carregarConfiguracoes()
      );
  }

}
