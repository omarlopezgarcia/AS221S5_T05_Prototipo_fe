import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { IBook, IBookDto } from '../../model/book.model';
import { ICategories } from 'src/app/modules/categories/model/categories.model';
import { IAuthor } from 'src/app/modules/author/model/author.model';
import { CategoriesService } from 'src/app/modules/categories/service/categories.service';
import { AuthorService } from 'src/app/modules/author/service/author.service';
import { BookService } from '../../service/book.service';

@Component({
  selector: 'app-book-save',
  templateUrl: './book-save.component.html',
  styles: [
  ]
})
export class BookSaveComponent implements OnInit {
  public book: IBook = new IBook();
  public bookForm: FormGroup = new FormGroup<any>('');
  public category: ICategories[] = [];
  public author: IAuthor[] = [];
  characterCount: number = 0;

  constructor(private categoriesService: CategoriesService, private authorService: AuthorService, private bookService: BookService, private fb: FormBuilder, private bsModalRef: BsModalRef, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getCategories();
    this.getAuthors();
    this.initBookForm();
  }

  initBookForm(){
    this.bookForm = this.fb.group({
      title: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
      category: ['', [Validators.required]],
      author: ['', [Validators.required]],
    });

    if(this.book && this.book.id){
      this.bookForm.patchValue(this.book);
    }
  }

  compareFn(option: any, value: any): boolean{
    return option.id === value.id;
  }
  
  getCategories(){
    this.categoriesService.getActive().subscribe((res) => {
      this.category=res;
    })
  }

  getAuthors(){
    this.authorService.getActive().subscribe((res) => {
      this.author=res;
    })
  }

  saveBook() {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const bookDto: IBookDto = new IBookDto();
    bookDto.title = this.f['title'].value;
    bookDto.stock = this.f['stock'].value;
    bookDto.isbn = this.f['isbn'].value;
    bookDto.category = this.f['category'].value.id;
    bookDto.author = this.f['author'].value.id;
    if (this.book && this.book.id) {
      this.update(this.book.id, bookDto);
    } else {
      this.register(bookDto);
    }
  }

  update(id: number, data: IBookDto){
    this.bookService.update(id, data).subscribe((res) => {
      this.toastr.success('El libro se edito correctamente!','Libro editado');
      this.closeModal();
    },((err) => {
      console.log(err);
    }))
  }

  register(data: IBookDto){
    this.bookService.created(data).subscribe((res) => {
      this.toastr.success('El libro se inserto correctamente!','Libro insertado')
      this.closeModal();
    }, ((err) => {
      console.log(err);
    }))
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.bookForm.controls;
  }

  onIsbnInput(event: any) {
    let inputValue: string = event.target.value;
  
    if (inputValue.length > 13) {
      inputValue = inputValue.slice(0, 13);
      this.bookForm.patchValue({ isbn: inputValue });
      this.characterCount = 13;
    } else {
      this.characterCount = inputValue.length;
    }
  }

}
