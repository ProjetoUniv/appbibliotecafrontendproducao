import { HttpClient } from '@angular/common/http';
import { DialogComponent } from '../componentes/dialog/dialog.component';

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {


  constructor(private dialog: MatDialog, private http: HttpClient) { }

  openConfirmDialog(msg: string){
   return this.dialog.open(DialogComponent, {
      width: '390px',
      height: '150px',
      disableClose: true,
      data : {
        message: msg
      }
    });

  }

}
