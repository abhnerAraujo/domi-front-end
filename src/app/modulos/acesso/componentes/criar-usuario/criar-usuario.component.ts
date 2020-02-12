import { Subscription } from 'rxjs';
import { Validators, FormBuilder, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-criar-usuario',
  templateUrl: './criar-usuario.component.html',
  styleUrls: ['./criar-usuario.component.scss']
})
export class CriarUsuarioComponent implements OnInit, OnDestroy {

  criarUsuarioForm: FormGroup;
  formChangesSubscription: Subscription;

  @Output() valido: EventEmitter<boolean>;
  @Output() formChange: EventEmitter<any>;

  constructor(fb: FormBuilder) {
    this.valido = new EventEmitter();
    this.formChange = new EventEmitter();
    this.criarUsuarioForm = fb.group({
      email: ['', Validators.compose([
        Validators.email, Validators.required
      ])],
      senha: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/)
      ])],
      repetir_senha: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/),
        this.repetirSenhaValidador()
      ])],
      primeiro_nome: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/),
        Validators.minLength(3)
      ])],
      sobrenome: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/),
        Validators.minLength(3)
      ])],
      sexo: ['', Validators.compose([
        Validators.required
      ])],
      data_nascimento: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  ngOnInit() {
    this.formChangesSubscription = this.criarUsuarioForm.valueChanges.subscribe(values => {
      this.formChange.emit(values);
      this.valido.emit(this.criarUsuarioForm.valid);
    });
  }

  ngOnDestroy() {
    if (this.formChangesSubscription) {
      this.formChangesSubscription.unsubscribe();
    }
  }

  repetirSenhaValidador(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (this.criarUsuarioForm) {
        if (!this.criarUsuarioForm.get('senha').value || this.criarUsuarioForm.get('senha').value !== control.value) {
          return { repetirSenha: true };
        }
      }
      return null;
    };
  }

}
