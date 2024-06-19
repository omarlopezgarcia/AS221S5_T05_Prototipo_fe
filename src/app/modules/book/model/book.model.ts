import { IAuthor } from './../../author/model/author.model';
import { ICategories } from './../../categories/model/categories.model';

export class IBook {
    id!: number;
    title!: string;
    stock!: string;
    isbn!: string;
    category!: ICategories[];
    author!: IAuthor[];
    url_download!: string;
    description!: string;
    active?: string;
}

export class IBookDto {
    id!: number;
    title!: string;
    stock!: string;
    isbn!: string;
    category!: number;
    url_download!: string;
    description!: string;
    author!: number;
}