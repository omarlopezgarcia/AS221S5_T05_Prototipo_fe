import { Component, OnInit } from '@angular/core';
import { IUbigeo } from '../../model/ubigeo.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UbigeoService } from '../../service/ubigeo.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ubigeo-save',
  templateUrl: './ubigeo-save.component.html',
  styles: [
  ]
})
export class UbigeoSaveComponent implements OnInit {
  public ubigeo: IUbigeo = new IUbigeo();
  public ubigeoForm: FormGroup = new FormGroup<any>('');

  constructor(private ubigeoService: UbigeoService, private fb: FormBuilder, private bsModalRef: BsModalRef, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.initUbigeoForm();
  }

  initUbigeoForm(){
    this.ubigeoForm = this.fb.group({
      district: [''],
      province: ['', [Validators.required]],
      department: ['', [Validators.required]],
    });

    if(this.ubigeo && this.ubigeo.id){
      this.ubigeoForm.patchValue(this.ubigeo);
    }
  }

  saveCategory() {
    if (this.ubigeoForm.invalid) {
      this.ubigeoForm.markAllAsTouched();
      return;
    }

    if (this.ubigeo && this.ubigeo.id) {
      this.update(this.ubigeo.id);
    } else {
      this.register();
    }
  }

  update(id: number){
    this.ubigeoService.update(id, this.ubigeoForm.value).subscribe((res) => {
      this.toastr.success('El ubigeo se edito correctamente!','Ubigeo editado');
      this.closeModal();
    },((err) => {
      console.log(err);
    }))
  }

  register(){
    this.ubigeoService.created(this.ubigeoForm.value).subscribe((res) => {
      this.toastr.success('El ubigeo se inserto correctamente!','Ubigeo insertado')
      this.closeModal();
    }, ((err) => {
      console.log(err);
    }))
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.ubigeoForm.controls;
  }

}
