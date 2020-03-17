import { MatSnackBar } from '@angular/material';
import { ListarAtendimentosDados } from './../../../../../../interfaces/listar-atendimentos.interface';
import { AtendimentosService } from './../../../../../../services/atendimentos/atendimentos.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-atendimentos-lista',
  templateUrl: './atendimentos-lista.component.html',
  styleUrls: ['./atendimentos-lista.component.scss']
})
export class AtendimentosListaComponent implements OnInit {

  atendimentos: ListarAtendimentosDados[];
  carregandoLista: boolean;


  constructor(private atendimentosService: AtendimentosService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.carregarAtendimentos();
  }

  carregarAtendimentos() {
    this.carregandoLista = true;
    this.atendimentosService.listar()
      .subscribe(
        resultado => this.atendimentos = resultado.dados,
        erro => this.snackbar.open(erro.mensagem || 'Erro ao carregar atendimentos', 'OK', { duration: 5000 }),
        () => this.carregandoLista = false);
  }

}
