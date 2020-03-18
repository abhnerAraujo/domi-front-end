import { RESPONSAVEL_TIPO } from './../../constantes/valores';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoResponsavel'
})
export class TipoResponsavelPipe implements PipeTransform {

  transform(value: any): any {
    return RESPONSAVEL_TIPO.find(tipo => tipo.valor === value).descricao;
  }

}
