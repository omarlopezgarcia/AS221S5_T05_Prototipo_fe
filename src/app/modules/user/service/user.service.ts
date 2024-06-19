import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser, IUserDto } from '../model/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = environment.apiUrl+'/v1';

  constructor(private http: HttpClient) { }

  getActive(){
    return this.http.get<IUser[]>(`${this.url}/users/active`)
  }

  getInactive(){
    return this.http.get<IUser[]>(`${this.url}/users/inactive`)
  }

  created(data: IUserDto){
    return this.http.post<IUser>(`${this.url}/user/`, data);
  }

  update(id: number, data: IUserDto){
    return this.http.put<IUser>(`${this.url}/user/${id}`, data);
  }

  removed(id: number){
    return this.http.delete<void>(`${this.url}/user/removed/${id}`)
  }

  restore(id: number){
    return this.http.delete<void>(`${this.url}/user/restore/${id}`)
  }

  delete(id: number){
    return this.http.delete<void>(`${this.url}/user/${id}`)
  }
  
}
