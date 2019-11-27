import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hora'
})
export class HoraPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length === 4) {
      const valor = value.split('');
      valor.splice(2, 0, ':');
      return valor.join('');
    }
    if (value.length === 6) {
      const valor = value.split('');
      valor.splice(2, 0, ':');
      valor.splice(5, 0, ':');
      return valor.join('');
    }
    return value;
  }

}
