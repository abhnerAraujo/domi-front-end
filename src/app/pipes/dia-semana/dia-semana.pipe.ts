import { DIA_SEMANA_CURTO, DIA_SEMANA } from './../../constantes/dia-semana';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diaSemana'
})
export class DiaSemanaPipe implements PipeTransform {

  transform(value: number, curto: boolean): any {
    if (curto) {
      return DIA_SEMANA_CURTO[value];
    } else {
      return DIA_SEMANA[value];
    }
  }

}
