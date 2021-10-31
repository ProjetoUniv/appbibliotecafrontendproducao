import { Usuario } from './../models/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { NovoUsuario } from '../models/novo-usuario';


const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NovoUsuarioService {

private usuarioSubject = new BehaviorSubject<Usuario>({});

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  cadastrarNovoUsuario(novoUsuario: NovoUsuario){
    return this.http.post(`${API}/bibliotecainfantil/usuarios`, novoUsuario);
  }

  verificaEmailExistente(email: string){
    return this.http.get(`${API}/bibliotecainfantil/usuarios/email/${email}`)
  }


  verificaEmaileSenhaExistente(email: string, password: string): Observable<boolean>{
    return this.http.get<boolean>(`${API}/bibliotecainfantil/usuarios/email/${email}/password/${password}`)
  }

  message(msg: String): void{
    this.snackBar.open(`${msg}`, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 4000,
      panelClass: "sucess-dialog"
    })
   }

   retornaUsuario(){
     return this.usuarioSubject.asObservable();
   }


}
