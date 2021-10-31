import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/util/security.service';

import { Usuario } from '../../models/usuario';
import { AuthService } from '../../services/auth.service';
import { NovoUsuarioService } from '../../services/novo-usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  public users: Usuario = new Usuario();

  mostrarCabecalho: boolean = false;

  email = '';
  password = '';

  constructor(private service: NovoUsuarioService,
    private router: Router, private formBuilder: FormBuilder,
    private authService: AuthService) {
    const token = sessionStorage.getItem('livrouser') || '';
    if (token) {
      this.router.navigate(['/livros']);
    }

  }

  ngOnInit(): void {



  }

  login(users: Usuario) {
    if (users.email == '') {
      this.service.message('Campo email é obrigatório');
      return;
    }

    if (users.password == '') {
      this.service.message('Campo senha é obrigatório');
      return;
    }


    const result = this.service.verificaEmaileSenhaExistente(users.email, users.password).subscribe(
      result => {
        if (result) {
          this.setUser(users);
        }
        else {
          this.service.message('Dados inválidos');
        }
      },
      error => console.log(error)
    )

  }

  setUser(user: string | any) {
    SecurityService.set(user);
    //this.authService.mostrarMenuEmitter.emit(true);
    this.router.navigate(['/livros']);
  }

  cadastrarUsuario() {
    this.router.navigate(['novousuario']);
  }

}
