import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ICategories, ICategoriesDto } from '../../model/categories.model';
import { CategoriesService } from '../../service/categories.service';

@Component({
  selector: 'app-categories-save',
  templateUrl: './categories-save.component.html',
  styles: [
  ]
})
export class CategoriesSaveComponent implements OnInit {
  public categories: ICategories = new ICategories();
  public categoriesForm: FormGroup = new FormGroup<any>('');

  constructor(private categoriesService: CategoriesService, private fb: FormBuilder, private bsModalRef: BsModalRef, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.initCategoriesForm();
  }

  initCategoriesForm(){
    this.categoriesForm = this.fb.group({
      names: ['', [Validators.required,]]
    });

    if(this.categories && this.categories.id){
      this.categoriesForm.patchValue(this.categories);
    }
  }

  compareFn(option: any, value: any): boolean{
    return option.id === value.id;
  }

  saveCategories() {
    if (this.categoriesForm.invalid) {
      this.categoriesForm.markAllAsTouched();
      return;
    }

    const categoriesDto: ICategoriesDto = new ICategoriesDto();
    categoriesDto.names = this.f['names'].value;
    if (this.categories && this.categories.id) {
      this.update(this.categories.id, categoriesDto);
    } else {
      this.register(categoriesDto);
    }
  }

  update(id: number, data: ICategoriesDto){
    this.categoriesService.update(id, data).subscribe((res) => {
      this.toastr.success('La categoria se edito correctamente!','Categoria editada');
      this.closeModal();
    },((err) => {
      console.log(err);
    }))
  }

  register(data: ICategoriesDto){
    this.categoriesService.created(data).subscribe((res) => {
      this.toastr.success('La categoria se inserto correctamente!','Categoria insertada')
      this.closeModal();
    }, ((err) => {
      console.log(err);
    }))
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.categoriesForm.controls;
  }

}
