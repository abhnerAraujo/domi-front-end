import { MomentService } from './../../../../../compartilhado/services/moment/moment.service';
import { NOT_FOUND_ERROR_CODE, OK_STATUS_CODE } from './../../../../../../constantes/google_api';
import { mergeMap } from 'rxjs/operators';
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
  calendario: Calendar = null;

  agendamentos: Agendamento[];

  mediaQuerySubscription: Subscription;
  googleCalendarSubscription: Subscription;
  googleCalendarApiSubscription: Subscription;
  activeMediaQuery: string;

  carregando: boolean;

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
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.carregaCalendario();
      this.carregarAgendamentos();
      this.mediaQuerySubscription = this.mediaObserver.asObservable().subscribe(
        (change: MediaChange[]) => {
          this.activeMediaQuery = change[0].mqAlias;
        });
    });
  }

  proximo() {
    this.calendario.next();
    this.carregarAgendamentos();
  }

  anterior() {
    this.calendario.prev();
    this.carregarAgendamentos();
  }

  hoje() {
    this.calendario.gotoDate(this.calendario.getNow());
    this.carregarAgendamentos();
  }

  carregaCalendario() {
    this.calendario = this.calendar.getApi();
    this.calendario.setOption('height', 'auto');
    this.calendario.setOption('plugins', [dayGridPlugin, timeGridPlugin, listGridPlugin]);
    this.calendario.setOption('locale', brLocale);
    this.calendario.setOption('header', null);
    this.calendario.setOption('navLinks', true);
    this.calendario.setOption('navLinkDayClick', (date: Date, jsEvent) => {
      const dialogRef = this.dialog.open(DialogAdicionarEventoComponent, { data: { agendamento_data: date.toISOString() } });
      dialogRef.afterClosed().subscribe((evento: any) => {
        if (evento) {
          this.cadastrarEvento(evento);
        }
      });
    });
    this.calendario.render();
  }

  abrirEvento(evento) {
    const agendamento = this.agendamentos.find(a =>
      (a.agendamento_id === Number(evento.event.id) ||
        (this.moment.momentBr(evento.event.start).isSame(a.agendamento_data) && Number(evento.event.groupId) === a.atendimento))
    );

    this.dialog.open(DialogAdicionarEventoComponent, {
      data: agendamento
    })
      .afterClosed().subscribe(retorno => {
        if (retorno && retorno.acao === 'excluir') {
          this.agendamentoService.excluir(retorno.agendamentoId)
            .subscribe(r => {
              this.snackBar.open('Feito!', 'ÓTIMO', { duration: DURACAO_SNACKBAR });
              this.carregarAgendamentos();
            });
        } else if (retorno && retorno.acao === 'editar') {
          this.agendamentoService.editar(retorno.id, {
            agendamento_id: agendamento.agendamento_id,
            atendimento: agendamento.atendimento,
            agendamento_data: retorno.start,
            quantidade: retorno.amount,
            duracao: retorno.duration,
            titulo: retorno.title,
            valor_sessao: 80 * 100,
            evento_google_id: agendamento.evento_google_id
          })
            .subscribe({
              next: (r) => this.snackBar.open('Feito!', 'ÓTIMO', { duration: DURACAO_SNACKBAR }),
              error: (e) => this.snackBar.open(e.mensagem || 'Ops! Algo deu erro.', 'OK', { duration: DURACAO_SNACKBAR }),
              complete: () => this.carregarAgendamentos()
            });
        }
      });
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
    this.carregando = true;
    this.calendario.removeAllEvents();
    const start = this.moment.momentBr(this.calendario.getDate().toISOString()).startOf('month').toISOString();
    const end = this.moment.momentBr(this.calendario.getDate().toISOString()).endOf('month').toISOString();
    this.agendamentoService.listar({
      startDate: start,
      endDate: end
    })
      .subscribe(r => this.agendamentos = r.dados, e => { }, () => {
        if (this.auth.user$) {
          if (this.googleCalendarApiSubscription) {
            this.carregarEventosGoogle(0, start, end);
          } else {
            this.googleCalendarApiSubscription = this.auth.calendarioApiCarregado.subscribe(r => {
              this.carregarEventosGoogle(0, start, end);
            });
          }
        } else {
          this.carregarAgendamentosNoCalendario();
        }
        setTimeout(() => this.carregando = false, 500);
      });
  }

  carregarEventosGoogle(tentativa: number, start: string, end: string) {
    if (this.googleCalendarSubscription) {
      this.googleCalendarSubscription.unsubscribe();
    }
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
        this.agendamentos.forEach(agendamento => {
          if (agendamento.evento_google_id && !eventos.find(e => e.id === agendamento.evento_google_id)) {
            const subs = this.agendamentoService
              .excluir(agendamento.agendamento_id)
              .subscribe(r => {
                subs.unsubscribe();
              });
          } else {
            this.calendario.addEvent({
              title: agendamento.titulo,
              id: agendamento.agendamento_id,
              groupId: agendamento.atendimento || 1,
              start: agendamento.agendamento_data,
              end: this.moment.momentBr(agendamento.agendamento_data)
                .add(agendamento.duracao * agendamento.quantidade, 'minute')
                .toISOString(),
              description: 'Agendamento de sessão'
            });
          }
        });
      },
      error: erro => {
        this.googleCalendarSubscription.unsubscribe();
        if (tentativa < 2) {
          this.carregarEventosGoogle(tentativa + 1, start, end);
        } else {
          this.carregarAgendamentosNoCalendario();
          this.snackBar.open('Não conseguimos carregar os eventos do Google', 'Ok', { duration: DURACAO_SNACKBAR });
        }
      }
    });
    this.auth.getCalendar(start, end);
  }

  carregarAgendamentosNoCalendario() {
    this.agendamentos.forEach(agendamento => {
      this.calendario.addEvent({
        title: agendamento.titulo,
        id: agendamento.agendamento_id,
        groupId: agendamento.atendimento,
        start: agendamento.agendamento_data,
        end: this.moment.momentBr(agendamento.agendamento_data)
          .add(agendamento.duracao * agendamento.quantidade, 'minute')
          .toISOString(),
        description: 'Agendamento de sessão'
      });
    });
  }

}
