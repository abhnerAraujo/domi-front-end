import { Pagamento } from './../../../interfaces/pagamentos.interface';
import { TiposPagamentoService } from './../../../services/tipos-pagamento/tipos-pagamento.service';
import { TipoPagamento } from './../../../interfaces';
import { CurrencyMaskConfig } from 'ng2-currency-mask/src/currency-mask.config';
import { TEMA_PRIMARIO } from './../../../../../constantes/time-picker';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { TIPOS_PAGAMENTO } from './../../../../../constantes/valores';
import { DURACAO_SNACKBAR } from './../../../../../constantes/config';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SessaoService } from '../../../services/sessao/sessao.service';
import { SessaoDetalhe } from '../../../interfaces/sessao-detalhe';
import { ActivatedRoute } from '@angular/router';
import { MomentService } from 'src/app/modulos/compartilhado/services/moment/moment.service';
import { Sessao } from '../../../interfaces';

@Component({
  selector: 'app-sessao-resumo',
  templateUrl: './sessao-resumo.component.html',
  styleUrls: ['./sessao-resumo.component.scss']
})
export class SessaoResumoComponent implements OnInit {

  sessao: Sessao;
  sessaoId: number;
  atendimentoId: number;
  processando: boolean;
  mostrarValorPago: boolean;
  tiposPagamento = TIPOS_PAGAMENTO;
  parcelamento: number[];
  notas: number[];

  opcoesPagamento: TipoPagamento[];
  sessaoForm: FormGroup;
  pagamentoForm: FormGroup;
  moedaOptions: CurrencyMaskConfig;

  temaPrimario: NgxMaterialTimepickerTheme;

  edicao = {
    sessao_data: false,
    hora_inicio: false,
    hora_fim: false,
    evolucao: false,
    quantidade: false,
    valor_sessao: false,
    nota_geral: false,
  };

  constructor(
    public location: Location,
    private sessaoService: SessaoService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    public moment: MomentService,
    private fb: FormBuilder,
    private tiposPagamentoService: TiposPagamentoService) {
    this.sessaoId = Number.parseInt(this.route.snapshot.params.id_sessao, 10);
    this.atendimentoId = Number.parseInt(this.route.snapshot.params.id_atendimento, 10);
    this.mostrarValorPago = false;
    this.temaPrimario = TEMA_PRIMARIO;
    this.moedaOptions = {
      align: 'left',
      allowNegative: true,
      decimal: ',',
      thousands: '.',
      prefix: 'R$ ',
      suffix: '',
      precision: 2,
    };
    this.parcelamento = [...Array(13).keys()];
    this.notas = [...Array(11).keys()];
    this.parcelamento.shift();
    this.notas.shift();
  }

  ngOnInit() {
    this.carregarSessao();
  }

  carregarSessao() {
    this.processando = true;
    this.sessaoService.sessao(this.atendimentoId, this.sessaoId)
      .subscribe(
        r => this.sessao = r.dados[0],
        e => this.snackbar.open(e.error.mensagem, 'Ok', { duration: DURACAO_SNACKBAR }),
        () => {
          this.sessaoForm = this.fb.group({
            sessao_data: [this.sessao.sessao_data],
            hora_inicio: [this.moment.momentBr(this.sessao.hora_inicio).format('LT')],
            hora_fim: [this.moment.momentBr(this.sessao.hora_fim).format('LT')],
            evolucao: [this.sessao.evolucao],
            quantidade: [this.sessao.quantidade],
            valor_sessao: [this.sessao.valor_sessao],
            nota_geral: [this.sessao.nota_geral],
            pagamentos: this.fb.array([]),
            pagamento_selecionado: [],
          });
          this.carregarTiposPagamento();
          if (this.sessao.pagamentos) {
            this.sessao.pagamentos.forEach(pagamento => this.adicionarPagamento(pagamento));
          }
          this.processando = false;
        }
      );
  }

  carregarTiposPagamento() {
    this.tiposPagamentoService.tiposPagamento()
      .subscribe(
        r => this.opcoesPagamento = r.dados,
        e => this.snackbar.open(e.error ? e.error.mensagem : 'Ops! Algo deu errado', 'Ok', { duration: DURACAO_SNACKBAR }),
        () => { }
      );
  }

  calculaTempoTotal() {
    let formato = (this.sessao.tempo_corrido > 3600) ? 'HH [ hora(s) ]' : '';
    if (!(this.sessao.tempo_corrido === 3600)) {
      formato += (this.sessao.tempo_corrido > 60) ? 'mm [ minuto(s) e ]' : '';
      if (!(this.sessao.tempo_corrido === 60)) {
        formato += 'ss [ segundo(s)]';
      }
    }
    return this.moment.momentBr().hour(0).minute(0).second(this.sessao.tempo_corrido).format(formato);
  }

  carregarFormPagamento() {
    this.pagamentoForm = this.fb.group({
      valor_pago: [null, Validators.compose([
        Validators.required
      ])],
      tipo_pagamento: [this.tiposPagamento.dinheiro, Validators.compose([
        Validators.required
      ])],
      data_pagamento: [null, Validators.compose([
        Validators.required
      ])],
      quantidade_parcelas: [],
      numero_comprovante: [],
      numero_cartao: [null],
      sessao_pagamento_id: [null],
      pagamento_cartao_id: [null]
    });
    this.pagamentoForm.controls.tipo_pagamento.valueChanges
      .subscribe(r => this.mudancaTipoPagamento(r));
  }

  calculaValorPago() {
    if (this.pagamentos && this.pagamentos.length) {
      const valores: number[] = this.pagamentos.controls.map(control => {
        return control.get('valor_pago').value;
      });
      return valores.reduce((total, atual) => total += atual);
    } else {
      return 0;
    }
  }

  reverter(campo: string) {
    if (!this.edicao[campo]) {
      this.edicao[campo] = true;
    } else {
      this.sessaoForm.get(campo).reset(this.sessao[campo]);
      this.edicao[campo] = false;
    }
  }

  salvar(campo: string) {
    const valorForm: Sessao = this.sessaoForm.getRawValue();
    valorForm.hora_inicio = this.moment.momentBr().set({
      hour: Number(valorForm.hora_inicio.split(':')[0]), minutes: Number(valorForm.hora_inicio.split(':')[1])
    }).toISOString();
    valorForm.hora_fim = this.moment.momentBr().set({
      hour: Number(valorForm.hora_fim.split(':')[0]), minutes: Number(valorForm.hora_fim.split(':')[1])
    }).toISOString();
    valorForm.valor_sessao = valorForm.valor_sessao * 100;
    if (valorForm.pagamentos) {
      valorForm.pagamentos = this.pagamentos.value.map(pagamento => {
        return {
          sessao_pagamento_id: pagamento.sessao_pagamento_id,
          pagamento_cartao_id: pagamento.pagamento_cartao_id,
          sessao: pagamento.sessao,
          valor_pago: pagamento.valor_pago * 100,
          tipo_pagamento: pagamento.tipo_pagamento,
          tipo_pagamento_descricao: pagamento.tipo_pagamento_descricao,
          quantidade_parcelas: pagamento.quantidade_parcelas,
          numero_comprovante: pagamento.numero_comprovante,
          numero_cartao: pagamento.numero_cartao,
          data_pagamento: pagamento.data_pagamento,
          excluido: pagamento.excluido
        };
      });
    }
    this.sessaoService.editar(this.atendimentoId, this.sessaoId, valorForm)
      .subscribe(
        r => this.snackbar.open(r.mensagem, 'Ótimo', { duration: DURACAO_SNACKBAR }),
        e => this.snackbar.open(e.error.mensagem, 'Ok', { duration: DURACAO_SNACKBAR }),
        () => {
          this.carregarSessao();
          this.mostrarValorPago = false;
          this.edicao[campo] = false;
        }
      );
  }

  get pagamentos() {
    return this.sessaoForm.controls.pagamentos as FormArray;
  }

  mudancaTipoPagamento(tipoPagamento: number) {
    if (tipoPagamento !== this.tiposPagamento.dinheiro) {
      this.pagamentoForm.get('quantidade_parcelas').setValidators(Validators.compose([Validators.required]));
      this.pagamentoForm.get('numero_comprovante').setValidators([Validators.maxLength(100), Validators.required]);
      this.pagamentoForm.get('numero_cartao').setValidators([Validators.pattern(/^[\d]{4}$/), Validators.required]);
      this.pagamentoForm.get('quantidade_parcelas').setValue(1);
      tipoPagamento === this.tiposPagamento.debito
        ? this.pagamentoForm.get('quantidade_parcelas').disable()
        : this.pagamentoForm.get('quantidade_parcelas').enable();
    } else {
      this.pagamentoForm.get('quantidade_parcelas').clearValidators();
      this.pagamentoForm.get('quantidade_parcelas').updateValueAndValidity();
      this.pagamentoForm.get('numero_comprovante').clearValidators();
      this.pagamentoForm.get('numero_comprovante').updateValueAndValidity();
      this.pagamentoForm.get('numero_cartao').clearValidators();
      this.pagamentoForm.get('numero_cartao').updateValueAndValidity();
    }
    this.pagamentoForm.updateValueAndValidity();
  }

  adicionarPagamento(pagamento: any) {
    this.pagamentos.push(this.fb.group({
      valor_pago: [pagamento.valor_pago],
      tipo_pagamento: [pagamento.tipo_pagamento],
      tipo_pagamento_descricao:
        [pagamento.tipo_pagamento_descricao]
        || this.opcoesPagamento.find(p => p.tipo_pagamento_id === pagamento.tipo_pagamento).descricao,
      data_pagamento: [typeof pagamento.data_pagamento === 'string'
        ? pagamento.data_pagamento
        : pagamento.data_pagamento.toISOString()],
      numero_cartao: [pagamento.numero_cartao],
      numero_comprovante: [pagamento.numero_comprovante],
      quantidade_parcelas: [pagamento.quantidade_parcelas],
      sessao: [this.sessao.sessao_id],
      sessao_pagamento_id: [pagamento ? pagamento.sessao_pagamento_id : 0],
      pagamento_cartao_id: [pagamento ? pagamento.pagamento_cartao_id : 0],
      excluido: [false]
    }));
  }

  excluirPagamentos() {
    const pagamentosSelecionados: Pagamento[] = this.sessaoForm.get('pagamento_selecionado').value;
    for (const control of this.pagamentos.controls) {
      const pagamento = pagamentosSelecionados.find(p => p.sessao_pagamento_id === control.get('sessao_pagamento_id').value);
      if (pagamento) {
        control.get('excluido').setValue(true);
      }
    }

    this.salvar('valor_pago');
  }

  editarPagamento() {
    this.carregarFormPagamento();
    const pagamento = this.sessaoForm.get('pagamento_selecionado').value[0];

    if (pagamento) {
      this.pagamentoForm.patchValue({
        valor_pago: pagamento.valor_pago,
        tipo_pagamento: pagamento.tipo_pagamento,
        data_pagamento: pagamento.data_pagamento,
        quantidade_parcelas: pagamento.quantidade_parcelas,
        numero_comprovante: pagamento.numero_comprovante,
        numero_cartao: pagamento.numero_cartao,
        sessao_pagamento_id: pagamento.sessao_pagamento_id,
        pagamento_cartao_id: pagamento.pagamento_cartao_id
      });
    }

    console.log(this.pagamentoForm.value);

    this.pagamentoForm.controls.tipo_pagamento.disable();
    this.pagamentoForm.updateValueAndValidity();
    this.sessaoForm.get('pagamento_selecionado').reset();

  }

  salvarPagamento(pagamento: any) {
    this.pagamentoForm = null;
    if (pagamento.sessao_pagamento_id) {
      const pagamentoControl = this.pagamentos.controls
        .find(control => control.get('sessao_pagamento_id').value === pagamento.sessao_pagamento_id);
      pagamentoControl.patchValue({
        valor_pago: pagamento.valor_pago,
        tipo_pagamento: pagamento.tipo_pagamento,
        tipo_pagamento_descricao: this.opcoesPagamento.find(p => p.tipo_pagamento_id === pagamento.tipo_pagamento).descricao,
        data_pagamento: typeof pagamento.data_pagamento === 'string'
          ? pagamento.data_pagamento
          : pagamento.data_pagamento.toISOString(),
        numero_cartao: pagamento.numero_cartao,
        numero_comprovante: pagamento.numero_comprovante,
        quantidade_parcelas: pagamento.quantidade_parcelas,
        sessao: this.sessao.sessao_id,
        sessao_pagamento_id: pagamento.sessao_pagamento_id,
        pagamento_cartao_id: pagamento.pagamento_cartao_id,
        excluido: false
      });
    } else {
      this.adicionarPagamento(pagamento);
    }
    this.salvar('valor_pago');
  }

}
