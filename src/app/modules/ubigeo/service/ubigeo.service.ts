import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IUbigeo } from '../model/ubigeo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  private url: string = environment.apiUrl+'/v2';

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<IUbigeo[]>(`${this.url}/ubigeos`)
  }

  created(data: IUbigeo){
    return this.http.post<IUbigeo>(`${this.url}/ubigeo/`, data);
  }

  update(id: number, data: IUbigeo){
    return this.http.put<IUbigeo>(`${this.url}/ubigeo/${id}`, data);
  }

  delete(id: number){
    return this.http.delete<void>(`${this.url}/ubigeo/${id}`)
  }
}
