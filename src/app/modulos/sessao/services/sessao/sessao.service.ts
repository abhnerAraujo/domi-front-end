import { MomentService } from './../../../compartilhado/services/moment/moment.service';
import { Sessao } from './../../interfaces/sessao-lista-response.interface';
import { Injectable } from '@angular/core';
import { SessaoDetalhe } from '../../interfaces/sessao-detalhe';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {

  constructor(private moment: MomentService) { }

  sessoes(): Sessao[] {
    const data = new Date();
    return [
      {
        sessao_id: 1,
        sessao_data: this.moment.momentBr(data.toISOString()).subtract(5, 'weeks').toISOString(),
        sessao_valor: 80.00,
        valor_pago: 0,
        evolucao: {
          evolucao_id: 1, sessao_id: 1, evolucao_descricao: 'Alguma descrição', indicador: 1
        }
      },
      {
        sessao_id: 2,
        sessao_data: this.moment.momentBr(data.toISOString()).subtract(4, 'weeks').toISOString(),
        sessao_valor: 80.00,
        valor_pago: 0,
        evolucao: {
          evolucao_id: 2, sessao_id: 2, evolucao_descricao: 'Alguma descrição', indicador: 3
        }
      },
      {
        sessao_id: 3,
        sessao_data: this.moment.momentBr(data.toISOString()).subtract(3, 'weeks').toISOString(),
        sessao_valor: 80.00,
        valor_pago: 80.00,
        evolucao: {
          evolucao_id: 3, sessao_id: 3, evolucao_descricao: 'Alguma descrição', indicador: 4
        }
      },
      {
        sessao_id: 4,
        sessao_data: this.moment.momentBr(data.toISOString()).subtract(2, 'weeks').toISOString(),
        sessao_valor: 80.00,
        valor_pago: 80.00,
        evolucao: {
          evolucao_id: 4, sessao_id: 4, evolucao_descricao: 'Alguma descrição', indicador: 5
        }
      },
      {
        sessao_id: 5,
        sessao_data: this.moment.momentBr(data.toISOString()).subtract(1, 'weeks').toISOString(),
        sessao_valor: 80.00,
        valor_pago: 80.00,
        evolucao: {
          evolucao_id: 5, sessao_id: 5, evolucao_descricao: 'Alguma descrição', indicador: 3
        }
      }
    ];
  }

  sessao(id: number): SessaoDetalhe {
    const sessao = this.sessoes().find(s => s.sessao_id === id);
    return {
      sessao_id: sessao.sessao_id,
      sessao_data: sessao.sessao_data,
      sessao_hora_inicio: '1209',
      sessao_hora_fim: '1336',
      sessao_quantidade: 2,
      sessao_duracao: 45,
      sessao_pago: true,
      sessao_valor: 80.00,
      sessao_valor_pago: 80.00,
      sessao_responsavel: {
        sessao_responsavel_email: 'responsavel@email.com',
        sessao_responsavel_nome: 'João da Silva',
        sessao_responsavel_id: 1,
        sessao_responsavel_telefone: '81999998888'
      },
      planejamento_id: 1,
      evolucao_id: 1
    };
  }
}
