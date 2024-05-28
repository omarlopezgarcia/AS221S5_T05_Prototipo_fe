import { IUser } from "../../user/model/user.model";
import { ILoanDetail, ILoanDetailDto } from "./loan-detail.model";

export class ILoan {
    id!: number;
    startDate?: Date;
    returnDate!: Date;
    user!: IUser;
    librarian!: IUser;
    active?: string;
    loanDetail?: ILoanDetail[];
}

export class ILoanDto {
    id?: number;
    returnDate!: Date;
    user!: number;
    librarian!: number;
    loanDetail!: ILoanDetailDto[];
}