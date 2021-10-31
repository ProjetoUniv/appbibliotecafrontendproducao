import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { LivrosService } from './services/livros.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoModule } from './componentes/cabecalho/cabecalho.module';
import { DialogComponent } from './componentes/dialog/dialog.component';
import { AuthGuard } from './guards/auth-guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { NovoUsuarioComponent } from './home/novo-usuario/novo-usuario.component';
import { LivrosGerenciarModule } from './modulo/livros-gerenciar.module';
import { MaterialModule } from './modulo/material.module';
import { AuthService } from './services/auth.service';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [AppComponent, LoginComponent, NovoUsuarioComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    SharedModule,
    LivrosGerenciarModule,
    MaterialModule,
    CabecalhoModule

  ],
  entryComponents: [DialogComponent],
  providers: [AuthService, AuthGuard, LivrosService, AlertModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
