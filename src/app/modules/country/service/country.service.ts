import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICountry, ICountryDto } from '../model/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private url: string = environment.apiUrl+'/v1';

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<ICountry[]>(`${this.url}/countries`)
  }

  getActive(){
    return this.http.get<ICountry[]>(`${this.url}/country/active`)
  }

  getInactive(){
    return this.http.get<ICountry[]>(`${this.url}/country/inactive`)
  }

  created(data: ICountryDto){
    return this.http.post<ICountry>(`${this.url}/country/`, data);
  }

  update(id: number, data: ICountryDto){
    return this.http.put<ICountry>(`${this.url}/country/${id}`, data);
  }

  delete(id: number){
    return this.http.delete<void>(`${this.url}/country/${id}`)
  }
  
}
