import { IAuthor } from "../../author/model/author.model";
import { ICategory } from "../../category/model/category.model";

export class IBook {
    id!: number;
    title!: string;
    stock!: number;
    isbn!: string;
    category!: ICategory[];
    author!: IAuthor[];
    active?: string;
}

export class IBookDto {
    id!: number;
    title!: string;
    stock!: number;
    isbn!: string;
    category!: number;
    author!: number;
    active?: string;
}