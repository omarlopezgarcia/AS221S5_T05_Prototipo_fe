import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { IUbigeo } from 'src/app/modules/ubigeo/model/ubigeo.model';
import { UbigeoService } from 'src/app/modules/ubigeo/service/ubigeo.service';
import { IRol } from '../../model/rol.model';
import { RolService } from '../../service/rol.service';

@Component({
  selector: 'app-rol-save',
  templateUrl: './rol-save.component.html',
  styles: [
  ]
})
export class RolSaveComponent implements OnInit {
  public rol: IRol = new IRol();
  public rolForm: FormGroup = new FormGroup<any>('');

  constructor(private rolService: RolService, private fb: FormBuilder, private bsModalRef: BsModalRef, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.initUbigeoForm();
  }

  initUbigeoForm(){
    this.rolForm = this.fb.group({
      names: ['', [Validators.required]],
      descriptions: [''],
    });

    if(this.rol && this.rol.id){
      this.rolForm.patchValue(this.rol);
    }
  }

  saveCategory() {
    if (this.rolForm.invalid) {
      this.rolForm.markAllAsTouched();
      return;
    }

    if (this.rol && this.rol.id) {
      this.update(this.rol.id);
    } else {
      this.register();
    }
  }

  update(id: number){
    this.rolService.update(id, this.rolForm.value).subscribe((res) => {
      this.toastr.success('El rol se edito correctamente!','Rol editado');
      this.closeModal();
    },((err) => {
      console.log(err);
    }))
  }

  register(){
    this.rolService.created(this.rolForm.value).subscribe((res) => {
      this.toastr.success('El rol se inserto correctamente!','Rol insertado')
      this.closeModal();
    }, ((err) => {
      console.log(err);
    }))
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.rolForm.controls;
  }

}
