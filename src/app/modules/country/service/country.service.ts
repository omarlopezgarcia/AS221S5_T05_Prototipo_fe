import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICountry } from '../model/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private url: string = environment.apiUrl+'/';

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<ICountry[]>(`${this.url}countries`)
  }

  created(data: ICountry){
    return this.http.post<ICountry>(`${this.url}country/`, data);
  }

  update(id: number, data: ICountry){
    return this.http.put<ICountry>(`${this.url}country/${id}`, data);
  }

  delete(id: number){
    return this.http.delete<void>(`${this.url}country/${id}`)
  }
}
