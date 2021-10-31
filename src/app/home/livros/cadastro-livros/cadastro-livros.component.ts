import { Router } from '@angular/router';
import { LivrosService } from '../../../services/livros.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Livros } from '../../../models/livros';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cadastro-livros',
  templateUrl: './cadastro-livros.component.html',
  styleUrls: ['./cadastro-livros.component.css']
})
export class CadastroLivrosComponent implements OnInit {

bookForm!: FormGroup;
books!: Livros;
file? : File;
imgUrl: any;
mostrarImagem: boolean = false;
imageUrl?: any | string;


  constructor(private formBuilder: FormBuilder, private sant: DomSanitizer,
    private livroService: LivrosService, private router: Router) { }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      company: ['', [Validators.required]],
      author: ['', [Validators.required]],
      ageGroup: [''],
      positionShelf: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(300)]],
      isbn: ['', [Validators.required]],
      amount: [''],
      image: ['', [Validators.required]],
      })
    };

  cadastrar(){
    if(this.bookForm.invalid){
      return;
    }

    const novoBook = this.bookForm.getRawValue() as Livros;
    novoBook.nameImage = this.imageUrl;

    this.livroService.verificaLivroExistente(novoBook.isbn).subscribe((resposta) => {
      if(resposta==true){
        this.livroService.message("Livro já cadastrado no sistema");
        return;
      }else{
        this.livroService.cadastrarLivros(novoBook).subscribe(() => {
          this.livroService.message("Livro Cadastrado com sucesso!");
          this.router.navigate(['livros']);
        })
      }

    },(error) => {
      console.log(console.error());

    });

  }

  onSelectNewFile(elemnt: any | HTMLInputElement): void{
    if(elemnt.files?.length == 0)return;
    this.file = (elemnt.files as FileList)[0];
    this.imageUrl = this.sant.bypassSecurityTrustHtml(window.URL.createObjectURL(this.file)) as string;
    const reader = new FileReader();
    reader.readAsDataURL(this.file as Blob);
    reader.onloadend = () => {
    this.imageUrl = reader.result;
    this.mostrarImagem = true;

    }


  }


    gravarArquivosCopia(arquivo: any): void{
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

    fechar(){
    this.router.navigate(['livros']);

    }
}
