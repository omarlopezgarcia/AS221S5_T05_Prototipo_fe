import { IBook } from "../../book/model/book.model";
import { IUser } from "../../user/model/user.model";

export class ILoan {
    id!: number;
    user!: IUser[];
    book!: IBook[];
    amount!: string;
    loanDate?: Date;
    returnDate?: Date;
    active?: string;
}

export class ILoanDto {
    id!: number;
    user!: number;
    book!: number;
    amount!: string;
    loanDate?: Date;
    returnDate?: Date;
}