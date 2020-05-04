import { DURACAO_SNACKBAR } from './../../../../../../constantes/config';
import { TiposPagamentoService } from './../../../../services/tipos-pagamento/tipos-pagamento.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { CurrencyMaskConfig } from 'ng2-currency-mask/src/currency-mask.config';
import { TipoPagamento } from 'src/app/modulos/sessao/interfaces';
moment.locale('pt-BR');

export interface FinalizarSessaoDados {
  sessao_id: number;
  sessao_duracao: number;
  sessao_tempo_corrido: string;
  sessao_quantidade: number;
  sessao_data: any;
  sessao_responsavel: string;
  sessao_email_responsavel: string;
  sessao_envia_email_responsavel: boolean;
  sessao_orientacoes: string;
  sessao_valor: number;
  sessao_paga: boolean;
  sessao_nota_geral: number;
  sessao_pagamentos?: { sessao_valor_pago: number; sessao_tipo_pagamento: number; }[];
  sessao_falta: boolean;
}

@Component({
  selector: 'app-finalizar-sessao',
  templateUrl: './finalizar-sessao.component.html',
  styleUrls: ['./finalizar-sessao.component.scss']
})
export class FinalizarSessaoComponent implements OnInit {

  resumoSessaoForm: FormGroup;
  moedaOptions: CurrencyMaskConfig;
  notas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  tiposPagamento: TipoPagamento[];

  constructor(public dialogRef: MatDialogRef<FinalizarSessaoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: FinalizarSessaoDados,
    private fb: FormBuilder,
    private tiposPagamentoService: TiposPagamentoService,
    private snackbar: MatSnackBar) {
    this.resumoSessaoForm = fb.group({
      sessao_id: [data.sessao_id],
      sessao_duracao: [data.sessao_duracao],
      sessao_tempo_corrido: [{ disabled: true, value: data.sessao_tempo_corrido }],
      sessao_quantidade: [data.sessao_quantidade],
      sessao_data: [data.sessao_data],
      sessao_responsavel: [data.sessao_responsavel],
      sessao_email_responsavel: [data.sessao_email_responsavel],
      sessao_envia_email_responsavel: [data.sessao_envia_email_responsavel],
      sessao_orientacoes: [data.sessao_orientacoes],
      sessao_valor: [data.sessao_valor],
      sessao_nota_geral: [data.sessao_nota_geral],
      sessao_paga: [data.sessao_paga],
      sessao_pagamentos: fb.array([])
    });
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
    this.resumoSessaoForm.get('sessao_quantidade')
      .valueChanges
      .subscribe(quantidade => this.resumoSessaoForm.patchValue({ sessao_valor: this.data.sessao_valor * quantidade }));
  }

  quantidadeSessoes() {
    this.resumoSessaoForm
      .get('sessao_valor')
      .setValue(this.data.sessao_valor * this.resumoSessaoForm.get('sessao_quantidade').value);
  }

  formatarData = (valor: string, formato: string) => moment(valor).format(formato);

  sessaoPagaChange() {
    if (!this.tiposPagamento) {
      this.tiposPagamentoService.tiposPagamento()
        .subscribe(
          r => this.tiposPagamento = r.dados,
          e => this.snackbar.open(e.error.mensagem, 'Ok', { duration: DURACAO_SNACKBAR }),
          () => {
            if (this.pagamentos.length === 0) {
              this.addPagamento();
            }
          }
        );
    } else if (this.pagamentos.length === 0) {
      this.addPagamento();
    }
  }

  addPagamento() {
    let valorTotalPago = 0;
    const valorTotal = this.resumoSessaoForm.value.sessao_valor;
    this.pagamentos.controls.forEach(control => valorTotalPago += control.get('sessao_valor_pago').value);
    this.pagamentos.push(this.fb.group({
      sessao_valor_pago: [this.pagamentos.length === 0 ? valorTotal : valorTotal - valorTotalPago, Validators.compose([
        Validators.required, Validators.min(0.01)
      ])],
      sessao_tipo_pagamento: [this.tiposPagamento[0].tipo_pagamento_id, Validators.compose([
        Validators.required
      ])]
    }));
    this.resumoSessaoForm.get('sessao_paga').disable();
  }

  removerPagamento(index: number) {
    this.pagamentos.removeAt(index);
    if (this.pagamentos.length === 0) {
      this.resumoSessaoForm.get('sessao_paga').enable();
      this.resumoSessaoForm.get('sessao_paga').setValue(false);
    }
  }

  get pagamentos() {
    return this.resumoSessaoForm.controls.sessao_pagamentos as FormArray;
  }

}
