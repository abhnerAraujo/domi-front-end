import {
  DialogConfigDiaAtendimentoComponent, DadosDialogDiaAtendimento
} from './../dialog-config-dia-atendimento/dialog-config-dia-atendimento.component';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { CurrencyMaskConfig } from 'ng2-currency-mask/src/currency-mask.config';

@Component({
  selector: 'app-atendimento-configuracao',
  templateUrl: './atendimento-configuracao.component.html',
  styleUrls: ['./atendimento-configuracao.component.scss']
})
export class AtendimentoConfiguracaoComponent implements OnInit {

  diasAtendimento: DadosDialogDiaAtendimento[];
  valorSessao: number;
  moedaOptions: CurrencyMaskConfig;

  constructor(public location: Location, public dialog: MatDialog) {
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
    this.diasAtendimento = [];
    this.diasAtendimento.push(
      { id: 1, diaSemana: 'SEG', hora: '10:00', qtdSessoes: 2, duracao: 45 },
    );
  }

  abrirDialog(index: number) {
    let dados = {
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
    dialogRef.afterClosed().subscribe((retorno: DadosDialogDiaAtendimento) => {
      if (retorno) {
        if (retorno.id) {
          this.diasAtendimento[index] = retorno;
        } else {
          retorno.id = this.diasAtendimento.length + 1 || 1;
          this.diasAtendimento.push(retorno);
        }
      }
    });
  }

}
