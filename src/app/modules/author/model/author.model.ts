import { ICountry } from "../../country/model/country.model";

export class IAuthor {
    id!: number;
    fullName!: string;
    country!: ICountry[];
    active?: string;
}

export class IAuthorDto {
    id!: number;
    fullName!: string;
    country!: number;
}