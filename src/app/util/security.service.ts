import { NovoUsuario } from '../models/novo-usuario';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  public static set(user: NovoUsuario) {
    const data = JSON.stringify(user);
    sessionStorage.setItem('livrouser', btoa(data));
    console.log(data);
  }

  public static setUSer(user: NovoUsuario){
    const data = JSON.stringify(user);
    sessionStorage.setItem('livrouser', btoa(data));
  }

  public static getUser(): NovoUsuario  {
    const data = sessionStorage.getItem('livrouser');
    if(data){
        return JSON.parse(atob(data));
    }else {
        return null as any;
    }
  }

  public static clear(){
    sessionStorage.removeItem('livrouser');
  }

}
