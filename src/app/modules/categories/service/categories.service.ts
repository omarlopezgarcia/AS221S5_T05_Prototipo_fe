import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICategories, ICategoriesDto } from '../model/categories.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private url: string = environment.apiUrl+'/v1';

  constructor(private http: HttpClient) { }

  getActive(){
    return this.http.get<ICategories[]>(`${this.url}/categories/active`)
  }

  getInactive(){
    return this.http.get<ICategories[]>(`${this.url}/categories/inactive`)
  }

  created(data: ICategoriesDto){
    return this.http.post<ICategories>(`${this.url}/category/`, data);
  }

  update(id: number, data: ICategoriesDto){
    return this.http.put<ICategories>(`${this.url}/category/${id}`, data);
  }

  removed(id: number){
    return this.http.delete<void>(`${this.url}/category/removed/${id}`)
  }

  restore(id: number){
    return this.http.delete<void>(`${this.url}/category/restore/${id}`)
  }

  delete(id: number){
    return this.http.delete<void>(`${this.url}/category/${id}`)
  }
  
}
