/// <reference types="@types/dom-mediacapture-record" />
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-gravar-audio',
  templateUrl: './gravar-audio.component.html',
  styleUrls: ['./gravar-audio.component.scss']
})
export class GravarAudioComponent implements OnInit {

  @Output() cancelado: EventEmitter<void>;
  @Output() salvar: EventEmitter<void>;

  mediaRecorder: MediaRecorder;
  recordedVideo = document.querySelector('video#recorded');

  gravando: boolean;
  pausado: boolean;
  mostrarGravacao: boolean;

  constructor() {
    this.cancelado = new EventEmitter();
    this.salvar = new EventEmitter();
  }

  ngOnInit() {
  }

  start() {
    if (navigator.mediaDevices.getUserMedia) {
      this.gravando = true;
      this.pausado = false;
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.ondataavailable = (event => {
            const audio: any = document.querySelector('audio#gum');
            const audioURL = window.URL.createObjectURL(event.data);
            audio.src = audioURL;
            stream.getTracks().forEach(track => track.stop());
          });
          this.mediaRecorder.start();
        })
        .catch(error => console.log(error));
    }
  }

  stop() {
    if (this.mediaRecorder) {
      this.gravando = false;
      this.pausado = false;
      this.mostrarGravacao = true;
      this.mediaRecorder.stop();
      this.mediaRecorder = null;
    }
  }

  pause() {
    this.mediaRecorder.pause();
    this.pausado = true;
  }

  resume() {
    this.mediaRecorder.resume();
    this.pausado = false;
  }

}
