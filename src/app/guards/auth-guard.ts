import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class AuthGuard  implements CanActivate{

  constructor(private authService: AuthService,
    private router : Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | boolean{

    if(this.authService.usuarioEstaAutenticado()){
      this.router.navigate(['livros']);
      return true;

    }

    this.router.navigate(['']);
    return false;

  }

}
