import { MomentService } from './../../modulos/compartilhado/services/moment/moment.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataHora'
})
export class DataHoraPipe implements PipeTransform {

  constructor(private moment: MomentService) { }

  transform(value: string, formato: string): any {
    return this.moment.momentBr(value).format(formato);
  }

}
