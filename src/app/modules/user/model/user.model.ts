import { IRol } from "../../rol/model/rol.model";

export class IUser {
    id!: number;
    names!: string;
    lastName!: string;
    documentType!: string;
    documentNumber!: string;
    rol!: IRol[];
    ubigeo!: string;
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
    ubigeo!: string;
    email?: string;
    userName!: string;
    passwords!: string;
    cellPhone?: string;
    birthDate?: Date;
}