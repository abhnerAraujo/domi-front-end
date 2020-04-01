import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { CurrencyMaskConfig } from 'ng2-currency-mask/src/currency-mask.config';
moment.locale('pt-BR');

export interface FinalizarSessaoDados {
  sessao_id: number;
  sessao_duracao: string;
  sessao_quantidade: number;
  sessao_data: string;
  sessao_responsavel: string;
  sessao_email_responsavel: string;
  sessao_envia_email_responsavel: boolean;
  sessao_orientacoes: string;
  sessao_valor: number;
  sessao_paga: boolean;
}

@Component({
  selector: 'app-finalizar-sessao',
  templateUrl: './finalizar-sessao.component.html',
  styleUrls: ['./finalizar-sessao.component.scss']
})
export class FinalizarSessaoComponent implements OnInit {

  resumoSessaoForm: FormGroup;
  moedaOptions: CurrencyMaskConfig;

  constructor(public dialogRef: MatDialogRef<FinalizarSessaoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: FinalizarSessaoDados,
    fb: FormBuilder) {
    this.resumoSessaoForm = fb.group({
      sessao_id: [data.sessao_id],
      sessao_duracao: [{ disabled: true, value: data.sessao_duracao }],
      sessao_quantidade: [{ disabled: true, value: data.sessao_quantidade }],
      sessao_data: [data.sessao_data],
      sessao_responsavel: [data.sessao_responsavel],
      sessao_email_responsavel: [data.sessao_email_responsavel],
      sessao_envia_email_responsavel: [data.sessao_envia_email_responsavel],
      sessao_orientacoes: [data.sessao_orientacoes],
      sessao_valor: [data.sessao_valor],
      sessao_paga: [data.sessao_paga]
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
  }

  formatarData = (valor: string, formato: string) => moment(valor).format(formato);

}
