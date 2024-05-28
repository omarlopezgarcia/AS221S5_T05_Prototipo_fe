import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { IUser, IUserDto } from 'src/app/modules/user/model/user.model';
import { UserService } from 'src/app/modules/user/service/user.service';
import { ILoan, ILoanDto } from '../../models/loan.model';
import { IBook } from 'src/app/modules/book/model/book.model';
import { LoanService } from '../../services/loan.service';
import { BookService } from 'src/app/modules/book/service/book.service';
import { ILoanDetailDto } from '../../models/loan-detail.model';

@Component({
  selector: 'app-loan-save',
  templateUrl: './loan-save.component.html',
  styles: []
})
export class LoanSaveComponent implements OnInit {
  public loan: ILoan = new ILoan();
  public loanForm: FormGroup = new FormGroup<any>('');
  public users: IUser[] = [];
  public books: IBook[] = [];
  public loanDetails: ILoanDetailDto[] = [];

  constructor(
    private loanService: LoanService,
    private userService: UserService,
    private bookService: BookService,
    private fb: FormBuilder,
    private bsModalRef: BsModalRef,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getBooks();
    this.initLoanForm();
  }

  initLoanForm() {
    this.loanForm = this.fb.group({
      returnDate: ['', [Validators.required]],
      user: ['', [Validators.required]],
      librarian: ['', [Validators.required]],
      book: ['', [Validators.required]],
      amount: ['', [Validators.required]],
    });

    if (this.loan && this.loan.id) {
      this.loanForm.patchValue(this.loan);
    }
  }

  compareFn(option: any, value: any): boolean {
    return option.id === value.id;
  }

  getBookTitle(bookId: number): string {
    const selectedBook = this.books.find(book => book.id === bookId);
    return selectedBook ? selectedBook.title : '';
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

  onAddDetail() {
    if (this.loanForm.valid) {
      const detail: ILoanDetailDto = {
        book: this.loanForm.value.book.id,
        amount: this.loanForm.value.amount,
        loan: 0
      };

      this.loanDetails.push(detail);
    }
  }

  onRemoveDetail(index: number) {
    this.loanDetails.splice(index, 1);
  }

  saveLoan() {
    if (this.loanForm.invalid || this.loanDetails.length === 0) {
      this.loanForm.markAllAsTouched();
      return;
    }
  
    const loanDto: ILoanDto = {
      returnDate: this.loanForm.value.returnDate,
      user: this.loanForm.value.user.id,
      librarian: 9, // Cambia el valor a 9
      loanDetail: this.loanDetails
    };
  
    if (this.loan && this.loan.id) {
      this.update(this.loan.id, loanDto);
    } else {
      this.register(loanDto);
    }
  }
  
  update(id: number, data: ILoanDto) {
    this.loanService.update(id, data).subscribe(
      (res) => {
        this.toastr.success('El usuario se editó correctamente!', 'Usuario editado');
        this.closeModal();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  register(data: ILoanDto) {
    this.loanService.created(data).subscribe(
      (res) => {
        this.toastr.success('El usuario se insertó correctamente!', 'Usuario insertado');
        this.closeModal();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loanForm.controls;
  }
}
