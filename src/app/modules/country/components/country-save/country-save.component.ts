import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ICountry, ICountryDto } from '../../model/country.model';
import { CountryService } from '../../service/country.service';


@Component({
  selector: 'app-country-save',
  templateUrl: './country-save.component.html',
  styles: [
  ]
})
export class CountrySaveComponent implements OnInit {
  public country: ICountry = new ICountry();
  public countryForm: FormGroup = new FormGroup<any>('');

  constructor(private countryService: CountryService, private fb: FormBuilder, private bsModalRef: BsModalRef, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.initCountryForm();
  }

  initCountryForm(){
    this.countryForm = this.fb.group({
      names: ['', [Validators.required,]],
      code: ['', [Validators.required,]]
    });

    if(this.country && this.country.id){
      this.countryForm.patchValue(this.country);
    }
  }

  compareFn(option: any, value: any): boolean{
    return option.id === value.id;
  }

  saveCountry() {
    if (this.countryForm.invalid) {
      this.countryForm.markAllAsTouched();
      return;
    }

    const countryDto: ICountryDto = new ICountryDto();
    countryDto.names = this.f['names'].value;
    countryDto.code = this.f['code'].value;
    if (this.country && this.country.id) {
      this.update(this.country.id, countryDto);
    } else {
      this.register(countryDto);
    }
  }

  update(id: number, data: ICountryDto){
    this.countryService.update(id, data).subscribe((res) => {
      this.toastr.success('La nacionalidad se edito correctamente!','Nacionalidad editada');
      this.closeModal();
    },((err) => {
      console.log(err);
    }))
  }

  register(data: ICountryDto){
    this.countryService.created(data).subscribe((res) => {
      this.toastr.success('La nacionalidad se inserto correctamente!','Nacionalidad insertada')
      this.closeModal();
    }, ((err) => {
      console.log(err);
    }))
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.countryForm.controls;
  }

}
