import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ContextoService {

  private contextoSubject = new Subject<void>();
  contexto = this.contextoSubject.asObservable();

  constructor() { }

  atualizar() {
    this.contextoSubject.next();
  }

}
