import { MomentService } from './../../../compartilhado/services/moment/moment.service';
import { Subscription } from 'rxjs';
import { Validators, FormBuilder, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';

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

  @Input()
  set erros(valores: any) {
    if (valores) {
      for (const key in valores) {
        if (valores.hasOwnProperty(key)) {
          this.criarUsuarioForm.get(key).setErrors(valores[key][0]);
        }
      }
    }
  }

  constructor(fb: FormBuilder, private moment: MomentService) {
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
        Validators.required,
        this.dataNascimentoValidador()
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

  dataNascimentoValidador(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value) {
        const anoHoje = this.moment.momentBr().year();
        const anoEscolha = this.moment.momentBr(control.value).year();
        if ((anoHoje - anoEscolha) < 18) {
          return { idade: { esperada: 'maior que 18', informada: anoHoje - anoEscolha } };
        }
      }
      return null;
    };
  }

}
