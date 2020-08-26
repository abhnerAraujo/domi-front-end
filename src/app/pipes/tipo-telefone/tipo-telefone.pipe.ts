import { TIPOS_TELEFONE } from './../../constantes/valores';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoTelefone'
})
export class TipoTelefonePipe implements PipeTransform {

  transform(value: any): any {
    return TIPOS_TELEFONE.find(tipo => tipo.valor === value).descricao;
  }

}
