import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Livros } from './../models/livros';


const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  public getallBooks(): Observable<Livros []>{
    return this.http.get<Livros []>(`${API}/bibliotecainfantil/livrosbiblioteca`);

  }

  cadastrarLivros(livros: Livros): Observable<Livros> {
    return this.http.post<Livros>(`${API}/bibliotecainfantil/livrosbiblioteca`, livros);
  }

  verificaLivroExistente(isbn: string) {
    return this.http.get(`${API}/bibliotecainfantil/livrosbiblioteca/${isbn}}`);
  }


  getLivroById(id: any): Observable<Livros> {
    const url = `${API}/bibliotecainfantil/livrosbiblioteca/detalhes/${id}`;
    return this.http.get<Livros>(url);
  }

  message(msg: String): void {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 4000
    })
  }

  getImageForNameImage(nameImage: String): Observable<Livros> {
    const url = `${API}/bibliotecainfantil/images/${nameImage}`;
    return this.http.get<Livros>(url);
  }


  atualizarLivro(livros: Livros): Observable<Livros> {
    return this.http.put<Livros>(`${API}/bibliotecainfantil/livrosbiblioteca`, livros)
  }

  deletarLivros(id: any): Observable<Livros> {
    return this.http.delete<Livros>(`${API}/bibliotecainfantil/livrosbiblioteca/deletarlivro/${id}`);
  }


}




