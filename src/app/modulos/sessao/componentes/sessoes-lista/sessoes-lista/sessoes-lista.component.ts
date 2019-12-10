import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sessoes-lista',
  templateUrl: './sessoes-lista.component.html',
  styleUrls: ['./sessoes-lista.component.scss']
})
export class SessoesListaComponent implements OnInit {

  progresso: number;
  totalPago: number;
  total: number;

  constructor() { }

  ngOnInit() {
    this.total = 1040.00;
    this.totalPago = 800.00;
    this.carregarProgresso();
  }

  carregarProgresso() {
    const porcentagemProgresso = Math.round((100 * this.totalPago) / this.total);
    for (let i = 0; i <= porcentagemProgresso; i++) {
      this.progresso = i;
    }
  }

}
