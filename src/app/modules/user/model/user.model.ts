import { IRol } from "../../rol/model/rol.model";
import { IUbigeo } from "../../ubigeo/model/ubigeo.model";

export class IUser {
    id!: number;
    names!: string;
    lastName!: string;
    documentType!: string;
    documentNumber!: string;
    rol!: IRol[];
    ubigeo!: IUbigeo[];
    email?: string;
    userName!: string;
    passwords!: string;
    cellPhone?: string;
    birthDate?: Date;
    active?: string;
}

export class IUserDto {
    id!: number;
    names!: string;
    lastName!: string;
    documentType!: string;
    documentNumber!: string;
    rol!: number;
    ubigeo!: number;
    email?: string;
    userName!: string;
    passwords!: string;
    cellPhone?: string;
    birthDate?: Date;
}