import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAuthor, IAuthorDto } from '../model/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private url: string = environment.apiUrl+'/v2';

  constructor(private http: HttpClient) { }

  getActive(){
    return this.http.get<IAuthor[]>(`${this.url}/authors/active`)
  }

  getInactive(){
    return this.http.get<IAuthor[]>(`${this.url}/authors/inactive`)
  }

  created(data: IAuthorDto){
    return this.http.post<IAuthor>(`${this.url}/author/`, data);
  }

  update(id: number, data: IAuthorDto){
    return this.http.put<IAuthor>(`${this.url}/author/${id}`, data);
  }

  removed(id: number){
    return this.http.delete<void>(`${this.url}/author/removed/${id}`)
  }

  restore(id: number){
    return this.http.delete<void>(`${this.url}/author/restore/${id}`)
  }

  delete(id: number){
    return this.http.delete<void>(`${this.url}/author/${id}`)
  }
  
}
