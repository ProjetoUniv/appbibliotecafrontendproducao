import { Livros } from '../../../models/livros';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LivrosService } from '../../../services/livros.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alterar-livros',
  templateUrl: './alterar-livros.component.html',
  styleUrls: ['./alterar-livros.component.css']
})
export class AlterarLivrosComponent implements OnInit {

  bookForm!: FormGroup;
  books!: Livros;
  file! : File;
  imgUrl: any;
  id: number = 0;
  mostrarImagem: boolean = false;
  urlImage: any;
  imageUrl?: any | string;
  inscricao!: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router, private sant: DomSanitizer,
    private livroService: LivrosService, private fb: FormBuilder,  private dialogService: AlertModalService) {this.criarFormBranco() }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.inscricao = this.activatedRoute.params.subscribe(
      (params: any) => {
        this.id = params['id'];
      }
    );

    this.livroService.getLivroById(this.id).subscribe(
          data => {
            this.urlImage = data.nameImage;
            this.imageUrl = this.urlImage
            this.criaForm(data);
          },
          error => this.router.navigate(['livros'])
     );
  }

  atualizar(){

    if(this.bookForm.invalid){
      return;
    }

    const novoBook = this.bookForm.getRawValue() as Livros;
    novoBook.nameImage = this.imageUrl;
    novoBook.id = this.id;

      this.dialogService.openConfirmDialog("Deseja alterar esse livro?").afterClosed().subscribe( resp => {
        if(resp){
          this.livroService.atualizarLivro(novoBook).subscribe(() => {
            this.livroService.message("Livro atualizado com sucesso!");
            this.router.navigate(['livros']);
        }
          )
      }
    }, (error) => {
      console.log(error);
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
        title : [''],
        author: [''],
        company: [''],
        positionShelf: [''],
        description: [''],
        ageGroup: [''],
        isbn: [''],
        amount: [''],
        image: [''],
       });

    }

    onSelectNewFile(elemnt: any | HTMLInputElement): void{
      if(elemnt.files?.length == 0)return;
      this.file = (elemnt.files as FileList)[0];
      this.imageUrl = this.sant.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(this.file)) as string;
      console.log(this.imageUrl);
      const reader = new FileReader();
      reader.readAsDataURL(this.file as Blob);
      reader.onloadend = () => {
      this.imageUrl = reader.result;
      this.mostrarImagem = true;
    }}



  gravarArquivos(arquivo: any): void{
    const [file] = arquivo?.files;
    this.file = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event:any) => (
     this.imgUrl = reader.result,
     this.mostrarImagem = true

    )}

    realizaConsultaIsbn(){

      const novoBook = this.bookForm.getRawValue() as Livros;

      this.livroService.verificaLivroExistente(novoBook.isbn).subscribe((resposta) => {
        if(resposta == true){
          this.livroService.message("ISBN já cadastrado no sistema");
          return;
        }
      })

    }

    voltar(){
      this.router.navigate(['livros']);
    }

    ngOnDestroy(){
      this.inscricao.unsubscribe();
    }

}
