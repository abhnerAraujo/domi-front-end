import { Component, OnInit, AfterViewInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listGridPlugin from '@fullcalendar/list';
import { Calendar } from '@fullcalendar/core';
import brLocale from '@fullcalendar/core/locales/pt-br';

@Component({
  selector: 'app-atendimentos-lista',
  templateUrl: './atendimentos-lista.component.html',
  styleUrls: ['./atendimentos-lista.component.scss'],
})
export class AtendimentosListaComponent implements OnInit, AfterViewInit {

  visaoLista = false;
  atendimentos = [
    { nome: 'Matheus Felipe', dh_proximo_atendimento: '2019-11-23 10:00:00' },
    { nome: 'Ana Maria', dh_proximo_atendimento: '2019-11-25 10:00:00' },
    { nome: 'Marcos Henrique', dh_proximo_atendimento: null }
  ];

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const calendarioElemento = document.getElementById('calendar');
    const calendario = new Calendar(calendarioElemento, {
      plugins: [dayGridPlugin, timeGridPlugin, listGridPlugin],
      locale: brLocale,
      header: {
        left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        center: 'title'
      },
      events: [
        {
          title: 'Matheus Felipe',
          groupId: 1,
          start: '2019-11-16T10:00:00',
          end: '2019-11-16T10:40:00',
          description: 'Atendimento de Matheus Felipe (Sessão 1)'
        },
        {
          title: 'Matheus Felipe',
          groupId: 1,
          start: '2019-11-16T10:41:00',
          end: '2019-11-16T11:20:00',
          description: 'Atendimento de Matheus Felipe (Sessão 2)'
        }
      ]
    });
    calendario.render();
  }

}
