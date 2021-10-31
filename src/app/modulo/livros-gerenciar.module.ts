import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlterarLivrosComponent } from '../home/livros/alterar-livros/alterar-livros.component';
import { BuscarLivrosComponent } from '../home/livros/buscar-livros/buscar-livros.component';
import { CadastroLivrosComponent } from '../home/livros/cadastro-livros/cadastro-livros.component';
import { DetalheLivrosComponent } from '../home/livros/detalhe-livros/detalhe-livros.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    BuscarLivrosComponent,
    CadastroLivrosComponent,
    DetalheLivrosComponent,
    AlterarLivrosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ]
})

export class LivrosGerenciarModule { }
