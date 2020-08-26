import { SEXOS } from './../../constantes/valores';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sexo'
})
export class SexoPipe implements PipeTransform {

  constructor() { }

  transform(value: string): string {
    return SEXOS.find(sexo => sexo.valor === value).descricao || 'Não informado';
  }

}
