import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SessaoService } from '../../../services/sessao/sessao.service';
import { SessaoDetalhe } from '../../../interfaces/sessao-detalhe';
import { ActivatedRoute } from '@angular/router';
import { HoraPipe } from 'src/app/pipes/hora/hora.pipe';
import { MomentService } from 'src/app/modulos/compartilhado/services/moment/moment.service';

@Component({
  selector: 'app-sessao-resumo',
  templateUrl: './sessao-resumo.component.html',
  styleUrls: ['./sessao-resumo.component.scss']
})
export class SessaoResumoComponent implements OnInit {

  sessao: SessaoDetalhe;
  sessaoId: number;

  constructor(
    public location: Location,
    private sessaoService: SessaoService,
    private route: ActivatedRoute,
    private horaPipe: HoraPipe,
    private moment: MomentService) {
    this.sessaoId = Number.parseInt(this.route.snapshot.params.id_sessao, 10);
  }

  ngOnInit() {
    // this.sessao = this.sessaoService.sessao(this.sessaoId);
  }

  calculaTempoTotal(sessao: SessaoDetalhe) {
    const inicio = this.horaPipe.transform(sessao.sessao_hora_inicio);
    const fim = this.horaPipe.transform(sessao.sessao_hora_fim);
    return this.moment.momentBr(this.moment.momentBr().format('YYYY-MM-DD ') + fim)
      .diff(this.moment.momentBr().format('YYYY-MM-DD ') + inicio, 'minutes');
  }

}
