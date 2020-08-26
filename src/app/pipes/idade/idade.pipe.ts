import { MomentService } from './../../modulos/compartilhado/services/moment/moment.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idade'
})
export class IdadePipe implements PipeTransform {

  constructor(private moment: MomentService) { }

  transform(value: string, unidade?: any): any {
    return this.moment.momentBr().diff(value, unidade || 'years');
  }

}
