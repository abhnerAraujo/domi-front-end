import { MomentService } from './../../../../../compartilhado/services/moment/moment.service';
import { NOT_FOUND_ERROR_CODE, OK_STATUS_CODE } from './../../../../../../constantes/google_api';
import { mergeMap, retry } from 'rxjs/operators';
import { Agendamento } from './../../../../interfaces/agendamento.interface';
import { DURACAO_SNACKBAR } from './../../../../../../constantes/config';
import { AgendamentosService } from './../../../../services/agendamentos/agendamentos.service';
import { GoogleCalendarItem } from './../../../../../compartilhado/interfaces/google-calendar.interface';
import { AuthService } from './../../../../../compartilhado/services/auth/auth.service';
import { AtendimentosService } from './../../../../services/atendimentos/atendimentos.service';
import { DialogAdicionarEventoComponent } from '../dialog-adicionar-evento/dialog-adicionar-evento.component';
import { Subscription, of, throwError } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listGridPlugin from '@fullcalendar/list';
import { Calendar } from '@fullcalendar/core';
import brLocale from '@fullcalendar/core/locales/pt-br';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

@Component({
  selector: 'app-atendimentos-agenda',
  templateUrl: './atendimentos-agenda.component.html',
  styleUrls: ['./atendimentos-agenda.component.scss'],
  providers: [AtendimentosService]
})
export class AtendimentosAgendaComponent implements OnInit, AfterViewInit {

  @ViewChild('calendar', { static: true }) calendar: FullCalendarComponent;

  visaoLista = false;

  calendarPlugins: any[];
  calendario: Calendar;

  agendamentos: Agendamento[];

  mediaQuerySubscription: Subscription;
  googleCalendarSubscription: Subscription;
  activeMediaQuery: string;

  constructor(private mediaObserver: MediaObserver,
    private atendimentosService: AtendimentosService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public location: Location,
    public auth: AuthService,
    public agendamentoService: AgendamentosService,
    private moment: MomentService
  ) {
    this.calendarPlugins = [dayGridPlugin, timeGridPlugin, listGridPlugin];
  }

  ngOnInit() {
    this.auth.calendarioApiCarregado.subscribe(r => {
      this.carregarAgendamentos();
    });
  }

  ngAfterViewInit() {
    this.carregaCalendario();
    // this.carregarAtendimentos();
    this.mediaQuerySubscription = this.mediaObserver.asObservable().subscribe(
      (change: MediaChange[]) => {
        this.activeMediaQuery = change[0].mqAlias;
        if (this.activeMediaQuery === 'xs' || this.activeMediaQuery === 'sm') {
          const header = { center: 'title', left: 'prev', right: 'next' };
          const footer = { center: '', left: 'dayGridMonth,timeGridDay,listWeek', right: 'today' };
          this.atualizaCalendario(header, footer, 500);
        } else {
          const header = { center: 'title', left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek', right: 'today,prev,next' };
          const footer = { center: '', left: '', right: '' };
          this.atualizaCalendario(header, footer, 600);
        }
      });
  }

  atualizaCalendario(header: any, footer: any, height: number) {
    this.calendario.setOption('header', header);
    this.calendario.setOption('footer', footer);
  }

  carregarAtendimentos() {
    this.atendimentosService.listar()
      .subscribe(r => console.log(r.dados));
  }

  carregaCalendario() {
    const calendarioElemento = document.getElementById('calendar');
    this.calendario = this.calendar.getApi();
    this.calendario.setOption('height', 500);
    this.calendario.setOption('plugins', [dayGridPlugin, timeGridPlugin, listGridPlugin]);
    this.calendario.setOption('locale', brLocale);
    this.calendario.setOption('header', { center: 'title', left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek' });
    this.calendario.setOption('footer', { center: '', left: '', right: '' });
    this.calendario.setOption('navLinks', true);
    this.calendario.setOption('navLinkDayClick', (date: Date, jsEvent) => {
      const dialogRef = this.dialog.open(DialogAdicionarEventoComponent, { data: date });
      dialogRef.afterClosed().subscribe((evento: any) => {
        if (evento) {
          this.cadastrarEvento(evento);
        }
      });
    });
    this.calendario.render();
  }

  async cadastrarEvento(evento: any) {
    const googleEvent = await this.auth.insertEvent(evento);
    if (googleEvent.status === OK_STATUS_CODE) {
      this.agendamentoService.criar({
        agendamento_id: null,
        atendimento: null,
        agendamento_data: evento.start,
        quantidade: evento.amount,
        duracao: evento.duration,
        titulo: evento.title,
        valor_sessao: 80 * 100,
        evento_google_id: googleEvent.result.id
      }).subscribe(r => this.carregarAgendamentos());
      this.snackBar.open('Atendimento agendado', 'OK', { duration: DURACAO_SNACKBAR });
    } else {
      this.snackBar.open('Erro na comunicação com o Google, tente novamente', 'OK', { duration: DURACAO_SNACKBAR });
    }
  }

  carregarAgendamentos() {
    this.agendamentoService.listar({
      startDate: this.moment.momentBr().startOf('month').toISOString(),
      endDate: this.moment.momentBr().endOf('month').toISOString()
    })
      .subscribe(r => this.agendamentos = r.dados, e => { }, () => this.carregarEventosGoogle(1));
  }

  carregarEventosGoogle(tentativa: number) {
    this.calendario.removeAllEvents();
    if (this.auth.user$) {
      if (!this.googleCalendarSubscription) {
        const googleCalendar = this.auth.calendario.pipe(
          mergeMap(val => {
            if ((val as any).status === NOT_FOUND_ERROR_CODE) {
              return throwError('');
            }
            return of(val);
          })
        );
        this.googleCalendarSubscription = googleCalendar.subscribe({
          next: (eventos: GoogleCalendarItem[]) => {
            const agendamentosIntegrados = this.agendamentos.filter(agendamento => agendamento.evento_google_id);
            const ids = agendamentosIntegrados ? agendamentosIntegrados.map(ai => ai.evento_google_id) : [];
            if (eventos && ids.length) {
              eventos.forEach(evento => {
                if (ids.indexOf(evento.id) >= 0) {
                  this.calendario.addEvent({
                    title: evento.summary,
                    groupId: 1,
                    start: evento.start.dateTime,
                    end: evento.end.dateTime,
                    description: evento.description
                  });
                }
              });
            }
          },
          error: erro => {
            this.googleCalendarSubscription.unsubscribe();
            if (tentativa < 2) {
              this.carregarEventosGoogle(tentativa + 1);
            } else {
              this.snackBar.open('Não conseguimos carregar os eventos do Google', 'Ok', { duration: DURACAO_SNACKBAR });
            }
          }
        });
      }
      this.auth.getCalendar();
    }
  }

}
