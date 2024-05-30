import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IBook, IBookDto } from '../model/book.model';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private url: string = environment.apiUrl+'/v2';

  constructor(private http: HttpClient) { }

  getActive(){
    return this.http.get<IBook[]>(`${this.url}/books/active`)
  }

  getInactive(){
    return this.http.get<IBook[]>(`${this.url}/books/inactive`)
  }

  created(data: IBookDto){
    return this.http.post<IBook>(`${this.url}/book/`, data);
  }

  update(id: number, data: IBookDto){
    return this.http.put<IBook>(`${this.url}/book/${id}`, data);
  }

  removed(id: number){
    return this.http.delete<void>(`${this.url}/book/removed/${id}`)
  }

  restore(id: number){
    return this.http.delete<void>(`${this.url}/book/restore/${id}`)
  }

  delete(id: number){
    return this.http.delete<void>(`${this.url}/book/${id}`)
  }
  
}
