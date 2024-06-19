import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { IUser, IUserDto } from '../../model/user.model';
import { UserService } from '../../service/user.service';
import { RolService } from 'src/app/modules/rol/service/rol.service';
import { IRol } from 'src/app/modules/rol/model/rol.model';

@Component({
  selector: 'app-user-save',
  templateUrl: './user-save.component.html',
  styles: [
  ]
})
export class UserSaveComponent implements OnInit {
  public user: IUser = new IUser();
  public userForm: FormGroup = new FormGroup<any>('');
  public roles: IRol[] = [];


  constructor(private rolService: RolService, private userService: UserService, private fb: FormBuilder, private bsModalRef: BsModalRef, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getRoles();
    this.initUserForm();
  }

  initUserForm(){
    this.userForm = this.fb.group({
      names: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÁÉÍÓÚÜÑáéíóúüñ\s]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÁÉÍÓÚÜÑáéíóúüñ\s]+$/)]],
      documentType: ['', [Validators.required]],
      documentNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(8), Validators.maxLength(12), this.documentNumberValidator()]],
      rol: ['', [Validators.required]],
      ubigeo: ['', [Validators.required]],
      email: ['', [Validators.pattern(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)]],
      userName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      passwords: ['', [Validators.required]],
      cellPhone: ['', [Validators.pattern(/^9\d{8}$/)]],
      birthDate: ['', [this.minAgeValidator(6)]],
    });

    if(this.user && this.user.id){
      this.userForm.patchValue(this.user);
    }
  }

  compareFn(option: any, value: any): boolean{
    return option.id === value.id;
  }

  documentNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const documentType = this.userForm.get('documentType')?.value;
      const value = control.value;
      if (documentType === 'DNI' && value.length !== 8) {
        return { 'exactLengthDNI': true };
      }
      if (documentType === 'CNE' && value.length !== 12) {
        return { 'exactLengthCNE': true };
      }
      return null;
    };
  }

  minAgeValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
  
      const birthDate = new Date(control.value);
      const currentDate = new Date();
  
      const age = currentDate.getFullYear() - birthDate.getFullYear();
  
      if (currentDate.getMonth() < birthDate.getMonth() || (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
        return age - 1 >= minAge ? null : { 'minAge': true };
      }
  
      return age >= minAge ? null : { 'minAge': true };
    };
  }
  

  getRoles(){
    this.rolService.getAll().subscribe((res) => {
      this.roles=res;
    })
  }

  saveUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const userDto: IUserDto = new IUserDto();
    userDto.names = this.f['names'].value;
    userDto.lastName = this.f['lastName'].value;
    userDto.documentType = this.f['documentType'].value;
    userDto.documentNumber = this.f['documentNumber'].value;
    userDto.rol = this.f['rol'].value.id;
    userDto.ubigeo = this.f['ubigeo'].value;
    userDto.email = this.f['email'].value;
    userDto.userName = this.f['userName'].value;
    userDto.passwords = this.f['passwords'].value;
    userDto.cellPhone = this.f['cellPhone'].value;
    userDto.birthDate = this.f['birthDate'].value;
    if (this.user && this.user.id) {
      this.update(this.user.id, userDto);
    } else {
      this.register(userDto);
    }
  }

  update(id: number, data: IUserDto){
    this.userService.update(id, data).subscribe((res) => {
      this.toastr.success('El usuario se edito correctamente!','Usuario editado');
      this.closeModal();
    },((err) => {
      console.log(err);
    }))
  }

  register(data: IUserDto){
    this.userService.created(data).subscribe((res) => {
      this.toastr.success('El usuario se inserto correctamente!','Usuario insertado')
      this.closeModal();
    }, ((err) => {
      console.log(err);
    }))
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

}
