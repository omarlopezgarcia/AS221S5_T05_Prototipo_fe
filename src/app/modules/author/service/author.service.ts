import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAuthor, IAuthorDto } from '../model/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private url: string = environment.apiUrl+'/';

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<IAuthor[]>(`${this.url}authors`)
  }

  created(data: IAuthorDto){
    return this.http.post<IAuthorDto>(`${this.url}author/`, data);
  }

  update(id: number, data: IAuthorDto){
    return this.http.put<IAuthorDto>(`${this.url}author/${id}`, data);
  }

  delete(id: number){
    return this.http.delete<void>(`${this.url}author/${id}`)
  }
}
