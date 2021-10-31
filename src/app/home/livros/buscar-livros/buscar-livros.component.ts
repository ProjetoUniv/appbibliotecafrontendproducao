import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { Livros } from '../../../models/livros';
import { AlertModalService } from './../../../shared/alert-modal.service';
import { LivrosService } from '../../../services/livros.service';

@Component({
  selector: 'app-buscar-livros',
  templateUrl: './buscar-livros.component.html',
  styleUrls: ['./buscar-livros.component.css']
})
export class BuscarLivrosComponent implements OnInit {

  show: boolean = false;
  livros!: Livros[];
  livrosEmpty: boolean = false;
  displayedColumns: string[] = ['isbn', 'title', 'author', 'company', 'actions'];
  dataSource!: MatTableDataSource<Livros>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private livroService: LivrosService, private router: Router,
    private dialogService: AlertModalService) {

  }


  ngOnInit(){
    this.getAllBooks();
  }

  getAllBooks() {
    this.livroService.getallBooks().subscribe((data: Livros[]) => {
      this.livros = data;
      this.dataSource = new MatTableDataSource(data);
      if (this.dataSource.data.length < 1) {
        this.livrosEmpty = false;
        this.show = false;
        return;
      }
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.livrosEmpty = true;
      this.show = true;

    })
  }

  abrirDetalhes(id: number) {
    this.router.navigate(['/livros/detalhes-livros/', id]);
  }

  abrirAlterar(id: number) {
    this.router.navigate([`/livros/alterar-livros/${id}`]);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  excluir(id: any) {
    this.dialogService.openConfirmDialog("Você deseja excluir esse livro ?")
      .afterClosed().subscribe((resp) => {
        if (resp == true) {
          this.livroService.deletarLivros(id).subscribe(() => {
            this.livroService.message("Livro excluido com sucesso!");
            this.getAllBooks();
            this.show = false;
            // setTimeout(() => {
            //   this.show = true;
            //   this.getAllBooks()
            // }, 100);
          })
        }
      }, (error) => {
        console.log(error);
      });
  }

  cadastrarLivros(){
    this.router.navigate(['livros', 'cadastro-livros']);
  }

  ngOnDestroy(){

  }




}



