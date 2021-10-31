import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { AuthService } from './services/auth.service';
import { AlterarLivrosComponent } from './home/livros/alterar-livros/alterar-livros.component';
import { DetalheLivrosComponent } from './home/livros/detalhe-livros/detalhe-livros.component';
import { CadastroLivrosComponent } from './home/livros/cadastro-livros/cadastro-livros.component';
import { BuscarLivrosComponent } from './home/livros/buscar-livros/buscar-livros.component';
import { HomeComponent } from './home/home.component';

import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './home/login/login.component';
import { NovoUsuarioComponent } from './home/novo-usuario/novo-usuario.component';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthService],
  },

  { path: 'login', component: LoginComponent, data: {cabecalho: false} },

  { path: 'novousuario', component: NovoUsuarioComponent},

  {
    path: 'livros', canActivate: [AuthService],data: {cabecalho: true},
    children: [
      { path: '', component: BuscarLivrosComponent },
      { path: 'cadastro-livros', component: CadastroLivrosComponent},
      { path: 'detalhes-livros/:id', component: DetalheLivrosComponent },
      { path: 'alterar-livros/:id', component: AlterarLivrosComponent }

    ]
  },

]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
