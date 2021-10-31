import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/util/security.service';
import { Usuario } from '../models/usuario';

import { NovoUsuarioService } from '../services/novo-usuario.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioAutenticado: boolean = false;

  enable: boolean = false;

  constructor(private usuarioService: NovoUsuarioService, private router: Router) { }

  canActivate() {
    const usuario = SecurityService.getUser();
    if (usuario) {
      this.usuarioAutenticado = true;
      return true;
    } else {
      this.usuarioAutenticado = false;
      this.router.navigate(['/login']);
      return false;
    }
  }


  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }

}
