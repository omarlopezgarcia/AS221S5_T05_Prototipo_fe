import { IBook } from "../../book/model/book.model";
import { ILoan } from "./loan.model";

export class ILoanDetail {
    id!: number;
    amount!: number;
    loan!: ILoan;
    book!: IBook;
}

export class ILoanDetailDto {
    id?: number;
    amount!: number;
    loan!: number;
    book!: number;
}