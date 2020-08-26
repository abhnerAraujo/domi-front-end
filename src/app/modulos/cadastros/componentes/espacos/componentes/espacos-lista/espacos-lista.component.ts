import { ContextoService } from './../../../../../compartilhado/componentes/container-principal-wrapper/services/contexto/contexto.service';
import { DialogAjudaComponent } from './../dialog-ajuda/dialog-ajuda.component';
import { MatDialog } from '@angular/material';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Espaco } from '../../../../../acesso/interfaces/dados-usuario-response.interface';
import { EspacoService } from '../../services/espaco/espaco.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-espacos-lista',
  templateUrl: './espacos-lista.component.html',
  styleUrls: ['./espacos-lista.component.scss'],
  providers: [EspacoService]
})
export class EspacosListaComponent implements OnInit {

  espacosForm: FormArray;
  espacosArquivadosForm: FormArray;

  constructor(
    private espacosService: EspacoService,
    private contextoService: ContextoService,
    private fb: FormBuilder,
    private dialogo: MatDialog) {
    this.espacosForm = fb.array([]);
    this.espacosArquivadosForm = fb.array([]);
  }

  ngOnInit() {
    this.carregarEspacos();
  }

  carregarEspacos() {
    this.espacosForm.clear();
    this.espacosArquivadosForm.clear();
    this.espacosService.listar()
      .subscribe(
        r => r.dados.forEach(this.adicionarEspaco)
      );
  }

  adicionarEspaco = (espaco: Espaco) => {
    if (espaco.arquivado) {
      this.espacosArquivadosForm.push(this.fb.group({
        descricao: [espaco.descricao, Validators.required],
        padrao: [espaco.padrao],
        espaco_id: [espaco.espaco_id],
        espaco_profissional_id: [espaco.espaco_profissional_id],
        arquivado: [espaco.arquivado],
      }));
    } else {
      this.espacosForm.push(this.fb.group({
        descricao: [espaco.descricao, Validators.required],
        padrao: [espaco.padrao],
        espaco_id: [espaco.espaco_id],
        espaco_profissional_id: [espaco.espaco_profissional_id],
        arquivado: [espaco.arquivado],
      }));
    }
  }

  salvarNome(espaco: FormControl) {
    if (espaco.get('descricao').value && espaco.get('descricao').value.trim()) {
      espaco.get('descricao').setValue(espaco.get('descricao').value.trim());
      this.espacosService.editarEspaco(espaco.value)
        .subscribe(r => {
          this.carregarEspacos();
          this.contextoService.atualizar();
        });
    }
  }

  ajuda() {
    this.dialogo.open(DialogAjudaComponent, {
      minWidth: 320
    });
  }

  arquivar(espaco: FormControl) {
    this.espacosService.desabilitar(espaco.value)
      .subscribe(r => {
        this.carregarEspacos();
        this.contextoService.atualizar();
      });
  }

  desarquivar(espaco: FormControl) {
    this.espacosService.habilitar(espaco.value)
      .subscribe(r => {
        this.carregarEspacos();
        this.contextoService.atualizar();
      });
  }

  excluir(espaco: FormControl) {
    this.espacosService.excluir(espaco.value)
      .subscribe(r => {
        this.carregarEspacos();
        this.contextoService.atualizar();
      });
  }
}
