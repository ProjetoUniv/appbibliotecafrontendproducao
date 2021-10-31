import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NovoUsuarioService } from 'src/app/services/novo-usuario.service';
import { NovoUsuario } from '../../models/novo-usuario';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css'],
})
export class NovoUsuarioComponent implements OnInit {
  novoUsuarioForm!: FormGroup;
  emailJaExiste: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private novoUsuarioService: NovoUsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required]],
    });
  }

  cadastrar() {
    if (this.novoUsuarioForm.valid) {
      const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;

      this.novoUsuarioService.verificaEmailExistente(novoUsuario.email)
        .subscribe((resultado) => {
          if (resultado == true) {
            this.novoUsuarioService.message(
              'E-mail já cadastrado');
            return;
          } else {
            this.novoUsuarioService.cadastrarNovoUsuario(novoUsuario).subscribe(() => {
                this.novoUsuarioService.message(
                  'Usuário cadastrado com sucesso!'
                );
                this.router.navigate(['']);
              },
              (error) => {
                console.log(error);
              }
            );
          }
        });
    }
  }
}
