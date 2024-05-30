import { ICountry } from "../../country/model/country.model";

export class IAuthor {
    id!: number;
    fullname!: string;
    country!: ICountry[];
    active?: string;
}

export class IAuthorDto {
    id!: number;
    fullname!: string;
    country!: number;
}