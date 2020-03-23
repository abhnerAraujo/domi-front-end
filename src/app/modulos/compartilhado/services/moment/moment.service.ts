import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-BR');

@Injectable()
export class MomentService {

  constructor() { }

  momentBr(data?: string | moment.Moment): moment.Moment { return moment(data); }

  momento() { return moment; }
}
