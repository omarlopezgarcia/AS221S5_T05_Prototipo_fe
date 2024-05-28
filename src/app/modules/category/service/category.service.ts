import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICategory } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url: string = environment.apiUrl+'/';

  constructor(private http: HttpClient) { }

  getActive(){
    return this.http.get<ICategory[]>(`${this.url}categories/active`)
  }

  getInactive(){
    return this.http.get<ICategory[]>(`${this.url}categories/inactive`)
  }

  created(data: ICategory){
    return this.http.post<ICategory>(`${this.url}category/`, data);
  }

  update(id: number, data: ICategory){
    return this.http.put<ICategory>(`${this.url}category/${id}`, data);
  }

  removed(id: number){
    return this.http.delete<void>(`${this.url}category/removed/${id}`)
  }

  restore(id: number){
    return this.http.delete<void>(`${this.url}category/restore/${id}`)
  }

  delete(id: number){
    return this.http.delete<void>(`${this.url}category/${id}`)
  }
  
}
