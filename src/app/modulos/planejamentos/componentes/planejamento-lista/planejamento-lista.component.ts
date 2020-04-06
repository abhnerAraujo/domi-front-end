import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { DURACAO_SNACKBAR } from './../../../../constantes/config';
import { MatSnackBar, MatChipInputEvent } from '@angular/material';
import { PlanejamentosService } from './../../services/planejamentos/planejamentos.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Planejamento, Objetivo, CriarPlanejamentoRequest, Atividade } from '../../interfaces';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-planejamento-lista',
  templateUrl: './planejamento-lista.component.html',
  styleUrls: ['./planejamento-lista.component.scss']
})
export class PlanejamentoListaComponent implements OnInit {

  atendimentoId: number;
  planejamentoTexto: FormControl;
  planejamentoForm: FormGroup;
  objetivoSelecionado: AbstractControl;
  materiais: string[] = [];
  readonly separadores: number[] = [ENTER, COMMA];
  editarMateriais: boolean;

  carregando: boolean;
  nenhumResultado: boolean;
  planejamentos: Planejamento[] = [
    { planejamento_id: 0, planejamento_texto: '', created_at: '' },
    { planejamento_id: 0, planejamento_texto: '', created_at: '' },
    { planejamento_id: 0, planejamento_texto: '', created_at: '' },
  ];

  constructor(
    public location: Location,
    private route: ActivatedRoute,
    private planejamentoService: PlanejamentosService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder) {
    this.planejamentoTexto = new FormControl();
  }

  ngOnInit() {
    this.atendimentoId = Number.parseInt(this.route.snapshot.params.id_atendimento, 10);
    this.carregarPlanejamentos();
  }

  private async carregarPlanejamentos() {
    this.carregando = true;
    this.nenhumResultado = true;
    this.planejamentoService.listar(this.atendimentoId)
      .subscribe(
        r => this.planejamentos = r.dados,
        e => this.snackbar.open(e.error.mensagem, 'Ok', { duration: DURACAO_SNACKBAR }),
        () => setTimeout(() => {
          this.nenhumResultado = this.planejamentos.length === 0;
          this.carregando = false;
        }, 1000)
      );
  }

  salvar() {
    const request: CriarPlanejamentoRequest = this.planejamentoForm.value;

    if (this.planejamentoForm.value.planejamento_id) {
      this.planejamentoService.editar(this.atendimentoId, this.planejamentoForm.value.planejamento_id, request)
        .subscribe(
          r => this.snackbar.open(r.mensagem, 'Ótimo', { duration: DURACAO_SNACKBAR }),
          e => this.snackbar.open(e.error.mensagem, 'Ok', { duration: DURACAO_SNACKBAR }),
          () => {
            this.carregarPlanejamentos();
            this.planejamentoForm = null;
          }
        );
    } else {
      this.planejamentoService.criar(this.atendimentoId, request)
        .subscribe(
          r => this.snackbar.open(r.mensagem, 'Ótimo', { duration: DURACAO_SNACKBAR }),
          e => this.snackbar.open(e.error.mensagem, 'Ok', { duration: DURACAO_SNACKBAR }),
          () => {
            this.carregarPlanejamentos();
            this.planejamentoForm = null;
          }
        );
    }
  }

  carregarAtividades(objetivo: AbstractControl) {
    if (this.atividades(objetivo).length === 0) {
      const objetivoId = ((objetivo as FormGroup).controls.planejamento_objetivo_id.value);
      if (objetivoId) {
        this.planejamentoService.listaraAtividades(
          this.atendimentoId,
          this.planejamentoForm.value.planejamento_id,
          objetivoId)
          .subscribe(
            r => {
              if (r.dados && r.dados.length) {
                r.dados.forEach(atividade => {
                  this.addAtividade(objetivo, atividade);
                });
              }
            }
          );
      }
    }
  }

  adicionar(planejamento?: Planejamento) {
    this.planejamentoForm = this.fb.group({
      planejamento_texto: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern(/^.*[A-zÀ-ÿ1-9]{1,}.*$/)
      ])],
      materiais: [null],
      planejamento_id: [null],
      objetivos: this.fb.array([])
    });
    if (planejamento) {
      this.planejamentoForm.patchValue({
        planejamento_texto: planejamento.planejamento_texto,
        planejamento_id: planejamento.planejamento_id,
        materiais: planejamento.materiais
      });
      planejamento.objetivos.forEach(objetivo => this.addObjetivo(objetivo));
    }
  }

  get objetivos() {
    return this.planejamentoForm.controls.objetivos as FormArray;
  }

  addAtividade(objetivo: AbstractControl, atividade?: Atividade) {
    this.atividades(objetivo).push(this.fb.group({
      objetivo_atividade_id: [atividade ? atividade.objetivo_atividade_id : null],
      conteudo: [atividade ? atividade.conteudo : null, Validators.compose([
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern(/^.*[A-zÀ-ÿ1-9]{1,}.*$/)
      ])],
      excluido: [false]
    }));
  }

  atividades(objetivo: AbstractControl) {
    return ((objetivo as FormGroup).controls.atividades as FormArray);
  }

  addObjetivo(objetivo?: Objetivo) {
    this.objetivos.push(this.fb.group({
      conteudo: [objetivo ? objetivo.conteudo : null, Validators.compose([
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern(/^.*[A-zÀ-ÿ1-9]{1,}.*$/)
      ])],
      excluido: [false],
      planejamento_objetivo_id: [objetivo ? objetivo.planejamento_objetivo_id : null],
      atividades: this.fb.array([])
    }));
  }

  removerObjetivo(indexObjetivo: number) {
    if (this.objetivos.at(indexObjetivo).value.planejamento_objetivo_id) {
      (this.objetivos.at(indexObjetivo) as FormGroup).get('excluido').setValue(true);
    } else {
      this.objetivos.controls.splice(indexObjetivo, 1);
    }
    this.planejamentoForm.patchValue({
      objetivos: this.objetivos.value
    });
    this.planejamentoForm.updateValueAndValidity();
  }

  removerAtividade(objetivo: AbstractControl, indexAtividade: number) {
    if (this.atividades(objetivo).controls[indexAtividade].get('objetivo_atividade_id').value) {
      this.atividades(objetivo).controls[indexAtividade].get('excluido').setValue(true);
    } else {
      this.atividades(objetivo).controls.splice(indexAtividade, 1);
    }
  }

  excluir(planejamentoId: number) {
    this.carregando = true;
    this.planejamentoService.excluir(this.atendimentoId, planejamentoId)
      .subscribe(
        r => this.snackbar.open(r.mensagem, 'Ok', { duration: DURACAO_SNACKBAR }),
        e => {
          this.snackbar.open(e.error.mensagem, 'Ok', { duration: DURACAO_SNACKBAR });
          this.carregando = false;
        },
        () => this.carregarPlanejamentos()
      );
  }

  removerMaterial(material: string) {
    const index = this.materiais.indexOf(material);
    if (index >= 0) {
      this.materiais.splice(index, 1);
    }
  }

  adicionarMaterial(evento: MatChipInputEvent) {
    const input = evento.input;
    const valor = evento.value;

    if ((valor || '').trim()) {
      this.materiais.push(valor);
    }

    if (input) {
      input.value = '';
    }
  }

  salvarChips() {
    this.planejamentoForm.get('materiais').setValue(this.materiais.join(','));
    this.materiais = [];
    this.editarMateriais = false;
  }

  definirMateriais() {
    if (this.planejamentoForm.get('materiais').value) {
      this.materiais = this.planejamentoForm.get('materiais').value.split(',');
    } else {
      this.materiais = [];
    }
    this.editarMateriais = true;
  }

  objetivosFiltrados() {
    return this.objetivos.controls.filter(c => c.value.excluido === false);
  }

}
