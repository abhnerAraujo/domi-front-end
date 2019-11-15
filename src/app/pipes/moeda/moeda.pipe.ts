import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'moeda' })
export class MoedaPipe implements PipeTransform {
  transform(value: number, mostrarSimbolo?: boolean): string {
    // marcador de milhares ','
    let moeda = value.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    // substitui virgula por pontos e vise-versa
    moeda = moeda.replace('.', '#');
    moeda = moeda.replace(',', '.');
    moeda = moeda.replace('#', ',');
    return mostrarSimbolo ? `R$ ${moeda}` : `${moeda}`;
  }
}
