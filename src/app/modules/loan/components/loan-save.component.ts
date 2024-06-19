import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ILoan, ILoanDto } from '../model/loan.model';
import { UserService } from '../../user/service/user.service';
import { BookService } from '../../book/service/book.service';
import { LoanService } from '../service/loan.service';
import { IUser } from '../../user/model/user.model';
import { IBook } from '../../book/model/book.model';

@Component({
  selector: 'app-loan-save',
  templateUrl: './loan-save.component.html',
  styles: [
  ]
})
export class LoanSaveComponent implements OnInit {
  public loan: ILoan = new ILoan();
  public loanForm: FormGroup = new FormGroup<any>('');
  public users: IUser[] = [];
  public books: IBook[] = [];

  constructor(private bookService: BookService, private userService: UserService, private loanService: LoanService, private fb: FormBuilder, private bsModalRef: BsModalRef, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getUsers();
    this.getBooks();
    this.initLoanForm();
  }

  initLoanForm(){
    this.loanForm = this.fb.group({
      user: ['', [Validators.required]],
      book: ['', [Validators.required]],
      loanDate: ['', [Validators.required]],
      returnDate: ['', [Validators.required]],
      amount: ['', [Validators.required]],
    });

    if(this.loan && this.loan.id){
      this.loanForm.patchValue(this.loan);
    }
  }

  compareFn(option: any, value: any): boolean{
    return option.id === value.id;
  }
  

  getUsers() {
    this.userService.getActive().subscribe((res) => {
      this.users = res;
    });
  }

  getBooks() {
    this.bookService.getActive().subscribe((res) => {
      this.books = res;
    });
  }

  saveLoan() {
    if (this.loanForm.invalid) {
      this.loanForm.markAllAsTouched();
      return;
    }

    const loanDto: ILoanDto = new ILoanDto();
    loanDto.user = this.f['user'].value.id;
    loanDto.book = this.f['book'].value.id;
    loanDto.amount = this.f['amount'].value;
    loanDto.returnDate = this.f['returnDate'].value;
    loanDto.loanDate = this.f['loanDate'].value;
    if (this.loan && this.loan.id) {
      this.update(this.loan.id, loanDto);
    } else {
      this.register(loanDto);
    }
  }

  update(id: number, data: ILoanDto){
    this.loanService.update(id, data).subscribe((res) => {
      this.toastr.success('El préstamo se edito correctamente!','Préstamo editado');
      this.closeModal();
    },((err) => {
      console.log(err);
    }))
  }

  register(data: ILoanDto){
    this.loanService.created(data).subscribe((res) => {
      this.toastr.success('El préstamo se inserto correctamente!','Préstamo insertado')
      this.closeModal();
    }, ((err) => {
      console.log(err);
    }))
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loanForm.controls;
  }

}
