
import { Livros } from '../../../models/livros';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LivrosService } from '../../../services/livros.service';


@Component({
  selector: 'app-detalhe-livros',
  templateUrl: './detalhe-livros.component.html',
  styleUrls: ['./detalhe-livros.component.css']
})
export class DetalheLivrosComponent implements OnInit {

  bookForm!: FormGroup;
  id: number = 0;
  books!: Livros;
  urlImage: any;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router, private livroService: LivrosService, private fb: FormBuilder) { this.criarFormBranco();}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

   this.livroService.getLivroById(this.id).subscribe((data: Livros) =>{
    this.urlImage = data.nameImage;
    this.criaForm(data);

   })


  }

  criaForm(books: Livros){

    this.bookForm.controls['title'].setValue(books.title);
    this.bookForm.controls['author'].setValue(books.author);
    this.bookForm.controls['company'].setValue(books.company);
    this.bookForm.controls['positionShelf'].setValue(books.positionShelf);
    this.bookForm.controls['ageGroup'].setValue(books.ageGroup);
    this.bookForm.controls['description'].setValue(books.description);
    this.bookForm.controls['isbn'].setValue(books.isbn);
    this.bookForm.controls['amount'].setValue(books.amount);

  }

  criarFormBranco(){
    this.bookForm = this.fb.group({
      title : [{value: null, disabled: true}],
      author: [{value: null, disabled: true}],
      company: [{value: null, disabled: true}],
      positionShelf: [{value: null, disabled: true}],
      description: [{value: null, disabled: true}],
      ageGroup: [{value: null, disabled: true}],
      isbn: [{value: null, disabled: true}],
      amount: [{value: null, disabled: true}],
    });
  }

  voltar(){
    this.router.navigate(['livros']);
  }



}
