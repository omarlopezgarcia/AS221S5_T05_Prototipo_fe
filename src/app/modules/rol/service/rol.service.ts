import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRol } from '../model/rol.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private url: string = environment.apiUrl+'/v1';

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<IRol[]>(`${this.url}/roles`)
  }

  created(data: IRol){
    return this.http.post<IRol>(`${this.url}/rol/`, data);
  }

  update(id: number, data: IRol){
    return this.http.put<IRol>(`${this.url}/rol/${id}`, data);
  }

  delete(id: number){
    return this.http.delete<void>(`${this.url}/rol/${id}`)
  }
}
