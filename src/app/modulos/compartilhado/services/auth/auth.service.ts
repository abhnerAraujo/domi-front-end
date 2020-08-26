import { environment } from './../../../../../environments/environment';
import { MomentService } from './../moment/moment.service';
import { Observable, Subject } from 'rxjs';
import { LOCAL_STORAGE_ITENS } from './../../../../constantes/config';
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

declare var gapi: any;

@Injectable()
export class AuthService {

  user$: Observable<firebase.User>;
  calendarItems: any[];
  private calendarSubject = new Subject<any[]>();
  private calendarioApiSubject = new Subject<void>();
  calendarioApiCarregado = this.calendarioApiSubject.asObservable();
  calendario = this.calendarSubject.asObservable();

  supportedPopupSignInMethods = [
    auth.GoogleAuthProvider.PROVIDER_ID,
    auth.FacebookAuthProvider.PROVIDER_ID
  ];
  constructor(public afAuth: AngularFireAuth, private moment: MomentService) {
    this.initClient();
    this.user$ = afAuth.authState;
  }

  initClient() {
    gapi.load('client', () => {
      gapi.client.init({
        apiKey: environment.firebaseConfig.apiKey,
        clientId: environment.firebaseConfig.clientId,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar'
      });

      gapi.client.load('calendar', 'v3', () => this.calendarioApiSubject.next());

    });
  }

  async login() {
    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();

    const token = googleUser.getAuthResponse().id_token;
    const credential = auth.GoogleAuthProvider.credential(token);

    await this.afAuth.auth.signInWithCredential(credential);
  }

  async getCalendar(start?: string, end?: string) {
    try {
      const events = await gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: start || this.moment.momentBr().startOf('month').toISOString(),
        timeMax: end || this.moment.momentBr().endOf('month').toISOString(),
        showDeleted: false,
        // singleEvents: true,
        // orderBy: 'startTime'
      });

      this.calendarItems = events.result.items;
      this.calendarSubject.next(this.calendarItems);
    } catch (erro) {
      this.calendarItems = null;
      this.calendarSubject.next(erro);
    }
  }

  async logout() {
    return auth().signOut();
  }

  async insertEvent(evento) {
    const insert = await gapi.client.calendar.events.insert({
      calendarId: 'primary',
      start: {
        dateTime: evento.start,
        timeZone: 'America/Recife'
      },
      end: {
        dateTime: evento.end,
        timeZone: 'America/Recife'
      },
      summary: evento.title,
      description: evento.description
    });
    return insert;
  }

  async updateEvent(evento) {
    const update = await gapi.client.calendar.events.update({
      calendarId: 'primary',
      eventId: evento.id,
      start: {
        dateTime: evento.start,
        timeZone: 'America/Recife'
      },
      end: {
        dateTime: evento.end,
        timeZone: 'America/Recife'
      }
    });
    return update;
  }

  getProvider(providerId: string) {
    switch (providerId) {
      case auth.GoogleAuthProvider.PROVIDER_ID:
        return new auth.GoogleAuthProvider();
      case auth.FacebookAuthProvider.PROVIDER_ID:
        return new auth.FacebookAuthProvider();
      default:
        throw new Error(`No provider implemented for ${providerId}`);
    }
  }

  async updateToken() {
    if (auth().currentUser) {
      const token = await auth().currentUser.getIdToken();
      localStorage.setItem(LOCAL_STORAGE_ITENS.token, token);
    }
  }

}
