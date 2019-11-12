import { DialogAdicionarEventoComponent } from './componentes/dialog-adicionar-evento/dialog-adicionar-evento.component';
import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listGridPlugin from '@fullcalendar/list';
import { Calendar } from '@fullcalendar/core';
import brLocale from '@fullcalendar/core/locales/pt-br';
import { FullCalendarComponent } from '@fullcalendar/angular';
import * as moment from 'moment';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-atendimentos-lista',
  templateUrl: './atendimentos-lista.component.html',
  styleUrls: ['./atendimentos-lista.component.scss'],
})
export class AtendimentosListaComponent implements OnInit, AfterViewInit {

  @ViewChild('calendar', { static: true }) calendar: FullCalendarComponent;

  visaoLista = false;
  atendimentos = [
    { nome: 'Matheus Felipe', dh_proximo_atendimento: '2019-11-23 10:00:00' },
    { nome: 'Ana Maria', dh_proximo_atendimento: '2019-11-25 10:00:00' },
    { nome: 'Marcos Henrique', dh_proximo_atendimento: null }
  ];
  calendarPlugins: any[];
  calendario: Calendar;

  mediaQuerySubscription: Subscription;
  activeMediaQuery: string;

  constructor(private mediaObserver: MediaObserver, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.calendarPlugins = [dayGridPlugin, timeGridPlugin, listGridPlugin];
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.carregaCalendario();
    this.mediaQuerySubscription = this.mediaObserver.asObservable().subscribe(
      (change: MediaChange[]) => {
        this.activeMediaQuery = change[0].mqAlias;
        if (this.activeMediaQuery === 'xs' || this.activeMediaQuery === 'sm') {
          const header = { center: '', left: 'title' };
          const footer = { center: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek', left: '', right: '' };
          this.atualizaCalendario(header, footer, 500);
        } else {
          const header = { center: 'title', left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek', right: 'today prev,next' };
          const footer = { center: '', left: '', right: '' };
          this.atualizaCalendario(header, footer, 600);
        }
      });
  }

  atualizaCalendario(header: any, footer: any, height: number) {
    this.calendario.setOption('header', header);
    this.calendario.setOption('footer', footer);
  }

  carregaCalendario() {
    const calendarioElemento = document.getElementById('calendar');
    this.calendario = this.calendar.getApi();
    const events = [
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
    ];
    this.calendario.setOption('height', 600);
    this.calendario.setOption('plugins', [dayGridPlugin, timeGridPlugin, listGridPlugin]);
    this.calendario.setOption('locale', brLocale);
    this.calendario.setOption('header', { center: 'title', left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek' });
    this.calendario.setOption('footer', { center: '', left: '', right: '' });
    this.calendario.setOption('navLinks', true);
    this.calendario.setOption('navLinkDayClick', (date: Date, jsEvent) => {
      const dialogRef = this.dialog.open(DialogAdicionarEventoComponent, { data: date });
      dialogRef.afterClosed().subscribe(resultado => {
        this.calendario.addEvent({
          title: 'Matheus Felipe',
          start: date.toISOString(),
          end: moment(date.toISOString()).add(1, 'hours').toISOString(),
          description: 'Atendimento de Matheus Felipe (Sessão 2)'
        });
        this.snackBar.open('Atendimento agendado', 'OK', { duration: 3500 });

      });
    });
    events.forEach(event => {
      this.calendario.addEvent(event);
    });
    this.calendario.render();
  }

}
