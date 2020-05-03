import { DURACAO_SNACKBAR } from './../../../../constantes/config';
import { MatSnackBar } from '@angular/material';
import { QuestoesService } from './../../services/questoes/questoes.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnamneseAvaliacaoItem } from '../../../atendimentos/interfaces';

@Component({
  selector: 'app-questao-item',
  templateUrl: './questao-item.component.html',
  styleUrls: ['./questao-item.component.scss']
})
export class QuestaoItemComponent implements OnInit {

  @Input() questaoResposta: AnamneseAvaliacaoItem;
  @Input() atendimento: number;
  @Output() remover: EventEmitter<void>;
  @Output() adicionarQuestao: EventEmitter<void>;

  formQuestao: FormGroup;
  naoSalvo: boolean;

  constructor(private fb: FormBuilder, private questoesService: QuestoesService, private snackbar: MatSnackBar) {
    this.naoSalvo = false;
    this.remover = new EventEmitter();
    this.adicionarQuestao = new EventEmitter();
  }

  ngOnInit() {
    if (this.questaoResposta && this.questaoResposta.anamnese_avaliacao_item_id) {
      this.formQuestao = this.fb.group({
        item: [this.questaoResposta.item, Validators.compose([Validators.required])],
        resposta: [this.questaoResposta.resposta, Validators.compose([Validators.required])],
        tipo: this.questaoResposta.tipo,
        sessao: this.questaoResposta.sessao
      });
    }
  }

  adicionar() {
    this.formQuestao = this.fb.group({
      item: ['', Validators.compose([Validators.required])],
      resposta: ['', Validators.compose([Validators.required])],
      tipo: this.questaoResposta.tipo,
      sessao: this.questaoResposta.sessao
    });
    this.naoSalvo = true;
  }

  salvar() {
    const valorForm = this.formQuestao.value;
    this.formQuestao.disable();
    this.questoesService.salvar(this.atendimento, valorForm)
      .subscribe(
        r => {
          this.naoSalvo = false;
          this.formQuestao = null;
        },
        e => this.snackbar.open(e.error.mensagem, 'Ok', { duration: DURACAO_SNACKBAR }),
        () => this.adicionarQuestao.emit());
  }

  editar() {
    if (this.questaoResposta.anamnese_avaliacao_item_id) {
      const valorForm = this.formQuestao.value;
      this.questoesService.editar(this.atendimento, this.questaoResposta.anamnese_avaliacao_item_id, valorForm)
        .subscribe(
          r => this.naoSalvo = false,
          e => this.snackbar.open(e.error.mensagem, 'Ok', { duration: DURACAO_SNACKBAR }),
          () => this.formQuestao.enable());
    } else {
      this.salvar();
    }
  }
}
