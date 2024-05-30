import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { IAuthor, IAuthorDto } from '../../model/author.model';
import { ICountry } from 'src/app/modules/country/model/country.model';
import { CountryService } from 'src/app/modules/country/service/country.service';
import { AuthorService } from '../../service/author.service';

@Component({
  selector: 'app-author-save',
  templateUrl: './author-save.component.html',
  styles: [
  ]
})
export class AuthorSaveComponent implements OnInit {
  public author: IAuthor = new IAuthor();
  public authorForm: FormGroup = new FormGroup<any>('');
  public country: ICountry[] = [];

  constructor(private countryService: CountryService, private authorService: AuthorService, private fb: FormBuilder, private bsModalRef: BsModalRef, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getCountrys();
    this.initAuthorForm();
  }

  initAuthorForm(){
    this.authorForm = this.fb.group({
      fullname: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });

    if(this.author && this.author.id){
      this.authorForm.patchValue(this.author);
    }
  }

  compareFn(option: any, value: any): boolean{
    return option.id === value.id;
  }
  
  getCountrys(){
    this.countryService.getAll().subscribe((res) => {
      this.country=res;
    })
  }

  saveAuthor() {
    if (this.authorForm.invalid) {
      this.authorForm.markAllAsTouched();
      return;
    }

    const authorDto: IAuthorDto = new IAuthorDto();
    authorDto.fullname = this.f['fullname'].value;
    authorDto.country = this.f['country'].value.id;
    if (this.author && this.author.id) {
      this.update(this.author.id, authorDto);
    } else {
      this.register(authorDto);
    }
  }

  update(id: number, data: IAuthorDto){
    this.authorService.update(id, data).subscribe((res) => {
      this.toastr.success('El autor se edito correctamente!','Autor editado');
      this.closeModal();
    },((err) => {
      console.log(err);
    }))
  }

  register(data: IAuthorDto){
    this.authorService.created(data).subscribe((res) => {
      this.toastr.success('El autor se inserto correctamente!','Autor insertado')
      this.closeModal();
    }, ((err) => {
      console.log(err);
    }))
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.authorForm.controls;
  }

}
