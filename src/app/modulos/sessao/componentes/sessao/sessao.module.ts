import { PlanejamentosService } from './../../../planejamentos/services/planejamentos/planejamentos.service';
import { PagamentosService } from './../../services/pagamentos/pagamentos.service';
import { TiposPagamentoService } from './../../services/tipos-pagamento/tipos-pagamento.service';
import { SessaoService } from './../../services/sessao/sessao.service';
import { AtendimentosService } from './../../../atendimentos/services/atendimentos/atendimentos.service';
import { MomentService } from './../../../compartilhado/services/moment/moment.service';
import { AvaliacaoModule } from './../../../avaliacao/avaliacao.module';
import { AnamneseModule } from './../../../anamnese/anamnese.module';
import { PipesModule } from './../../../../pipes/pipes.module';
import {
  DialogConfigDiaAtendimentoModule
} from './../../../compartilhado/componentes/dialog-config-dia-atendimento/dialog-config-dia-atendimento.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BottomSheetNavegacaoModule } from './../../../compartilhado/componentes/bottom-sheet-navegacao/bottom-sheet-navegacao.module';
import {
  MatButtonModule, MatIconModule, MatDividerModule, MatProgressBarModule,
  MatFormFieldModule, MatInputModule, MatCheckboxModule, MatExpansionModule, MatDialogModule
  , MatSliderModule, MatDatepickerModule, MatSnackBarModule, MatSelectModule, MatListModule, MatChipsModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SessaoRoutingModule } from './sessao-routing.module';
import { SessaoComponent } from './componentes/sessao/sessao.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinalizarSessaoComponent } from './componentes/finalizar-sessao/finalizar-sessao.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { GravarAudioComponent } from './componentes/gravar-audio/gravar-audio.component';
import { SalvarArquivoComponent } from './componentes/salvar-arquivo/salvar-arquivo.component';
import { SalvarNotaComponent } from './componentes/salvar-nota/salvar-nota.component';

@NgModule({
  declarations: [SessaoComponent, FinalizarSessaoComponent, GravarAudioComponent, SalvarArquivoComponent, SalvarNotaComponent],
  imports: [
    CommonModule,
    SessaoRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressBarModule,
    BottomSheetNavegacaoModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSliderModule,
    MatDatepickerModule,
    MatSelectModule,
    CurrencyMaskModule,
    DialogConfigDiaAtendimentoModule,
    PipesModule,
    FormsModule,
    NgxDropzoneModule,
    AnamneseModule,
    AvaliacaoModule,
    MatSnackBarModule,
    MatListModule,
    MatChipsModule
  ],
  providers: [
    MomentService,
    AtendimentosService,
    SessaoService,
    TiposPagamentoService,
    PagamentosService,
    PlanejamentosService
  ],
  entryComponents: [FinalizarSessaoComponent]
})
export class SessaoModule { }
