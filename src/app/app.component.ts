
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import { map, filter, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'controleLivros';

  mostrarMenu: boolean = false;
  visibility: boolean = false;


  constructor(private authService: AuthService,
    private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit() {

    //  this.authService.mostrarMenuEmitter.subscribe(
    //    mostrar => this.mostrarMenu = mostrar
    // );

    this.router.events.pipe(
      filter(events => events instanceof NavigationEnd),
      map(evt => this.activateRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }))
      .pipe(
        filter(route => route.outlet === "primary"),
        mergeMap(route => route.data)
      ).subscribe(x => x.cabecalho === true ? this.visibility = true : this.visibility = false)

  }


}
