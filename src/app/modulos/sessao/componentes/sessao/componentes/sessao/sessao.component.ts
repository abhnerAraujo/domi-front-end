import { MatBottomSheet } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import {
  BottomSheetNavegacaoComponent
} from '../../../../../compartilhado/componentes/bottom-sheet-navegacao/bottom-sheet-navegacao.component';

moment.locale('pt-BR');

@Component({
  selector: 'app-sessao',
  templateUrl: './sessao.component.html',
  styleUrls: ['./sessao.component.scss']
})
export class SessaoComponent implements OnInit {

  countDown: string;
  counter: number;
  limite: number;
  interval;
  parado: boolean;
  extrapolou: boolean;

  constructor(public bottomSheet: MatBottomSheet) {
    this.counter = 0;
    this.parado = true;
    this.extrapolou = false;
  }

  ngOnInit() {
    this.countDown = '00 : 00 : 00';
  }

  atualizarTempo() {
    this.countDown = moment().hours(0).minutes(0).seconds(this.counter++).format('HH : mm : ss');
    this.extrapolou = this.counter > this.limite;
  }

  iniciar(event: number) {
    this.parado = false;
    if (this.counter === 0) {
      this.limite = event * 60;
      this.countDown = '00 : 00 : 00';
    }
    this.interval = setInterval(() => this.atualizarTempo(), 1000);
  }

  pausar() {
    this.parado = true;
    clearInterval(this.interval);
  }

  parar() {
    this.parado = true;
    clearInterval(this.interval);
    this.counter = 0;
    this.countDown = '00 : 00 : 00';
    setTimeout(() => this.interval = null, 500);
  }

  adicionarArtefato() {
    const bottomSheetRef = this.bottomSheet.open(BottomSheetNavegacaoComponent, {
      data: [
        { url: '/atendimentos/1/notas/nova', icon: 'note_add', texto: 'NOTA' },
        { url: '/atendimentos/1/imagens/nova', icon: 'add_a_photo', texto: 'IMAGEM' },
        { url: '/atendimentos/1/videos/nova', icon: 'video_call', texto: 'VÍDEO' },
        { url: '/atendimentos/1/imagens/nova', icon: 'mic', texto: 'ÁUDIO' },
        { url: '/atendimentos/1/avaliacao/nova', icon: 'assessment', texto: 'AVALIAÇÃO' },
        { url: '/atendimentos/1/anamnese/nova', icon: 'assignment_ind', texto: 'ANAMNESE' },
      ],
      closeOnNavigation: true
    });
  }
}
