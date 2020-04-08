import { CurrencyMaskConfig } from 'ng2-currency-mask/src/currency-mask.config';
import { TEMA_PRIMARIO } from './../../../../../constantes/time-picker';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  sessaoForm: FormGroup;
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
    private fb: FormBuilder) {
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
            nota_geral: [this.sessao.nota_geral]
          });
          this.processando = false;
        }
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

  calculaValorPago() {
    if (this.sessao.pagamentos && this.sessao.pagamentos.length) {
      return this.sessao.pagamentos.reduce((total, atual) => {
        return {
          sessao_pagamento_id: 0,
          sessao: 0,
          valor_pago: total.valor_pago + atual.valor_pago,
          tipo_pagamento: 0,
          tipo_pagamento_descricao: ''
        };
      }).valor_pago;
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
    const valorForm: Sessao = this.sessaoForm.value;
    valorForm.hora_inicio = this.moment.momentBr().set({
      hour: Number(valorForm.hora_inicio.split(':')[0]), minutes: Number(valorForm.hora_inicio.split(':')[1])
    }).toISOString();
    valorForm.hora_fim = this.moment.momentBr().set({
      hour: Number(valorForm.hora_fim.split(':')[0]), minutes: Number(valorForm.hora_fim.split(':')[1])
    }).toISOString();
    valorForm.valor_sessao = valorForm.valor_sessao * 100;
    this.sessaoService.editar(this.atendimentoId, this.sessaoId, valorForm)
      .subscribe(
        r => this.snackbar.open(r.mensagem, 'Ótimo', { duration: DURACAO_SNACKBAR }),
        e => this.snackbar.open(e.error.mensagem, 'Ok', { duration: DURACAO_SNACKBAR }),
        () => {
          this.carregarSessao();
          this.edicao[campo] = false;
        }
      );
  }

}
