import { TIPOS_PAGAMENTO } from './../../../../../constantes/valores';
import { DURACAO_SNACKBAR } from './../../../../../constantes/config';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SessaoService } from '../../../services/sessao/sessao.service';
import { SessaoDetalhe } from '../../../interfaces/sessao-detalhe';
import { ActivatedRoute } from '@angular/router';
import { HoraPipe } from 'src/app/pipes/hora/hora.pipe';
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

  constructor(
    public location: Location,
    private sessaoService: SessaoService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private moment: MomentService) {
    this.sessaoId = Number.parseInt(this.route.snapshot.params.id_sessao, 10);
    this.atendimentoId = Number.parseInt(this.route.snapshot.params.id_atendimento, 10);
    this.mostrarValorPago = false;
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
        () => this.processando = false
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
    if (this.sessao.pagamentos) {
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

}
