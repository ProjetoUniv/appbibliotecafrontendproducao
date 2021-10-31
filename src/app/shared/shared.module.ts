
import { DialogModule } from '../componentes/dialog/dialog.module'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MensagemModule } from '../componentes/mensagem/mensagem.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MensagemModule,
    DialogModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule
  ],
  exports: [
    MensagemModule,
    DialogModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule
  ],
})
export class SharedModule { }
