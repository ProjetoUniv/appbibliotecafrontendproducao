import { AuthService } from './../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from './../../models/usuario';
import { Livros } from './../../models/livros';
import { SecurityService } from './../../util/security.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { NovoUsuarioService } from 'src/app/services/novo-usuario.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent {

  user$ = this.novoUsuarioService.retornaUsuario();

  @Output() public sidenavToggle = new EventEmitter();

  url: string = "";

  constructor(private novoUsuarioService: NovoUsuarioService, private router: Router, private authService: AuthService) { }

    public onToggleSidenav = () => {
      this.sidenavToggle.emit();
    }

 ngOnInit(){

 }

 logout(){
   SecurityService.clear();
   this.router.navigate(['']);
 }

}
