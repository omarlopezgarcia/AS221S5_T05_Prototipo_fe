import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILoan, ILoanDto } from '../models/loan.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private url: string = environment.apiUrl+'/';

  constructor(private http: HttpClient) { }

  getBorrowed(){
    return this.http.get<ILoan[]>(`${this.url}loans/borrowed`)
  }

  getReturned(){
    return this.http.get<ILoan[]>(`${this.url}loans/returned`)
  }

  created(data: ILoanDto){
    return this.http.post<ILoanDto>(`${this.url}loan/`, data);
  }

  update(id: number, data: ILoanDto){
    return this.http.put<ILoanDto>(`${this.url}loan/${id}`, data);
  }

  returned(id: number){
    return this.http.delete<void>(`${this.url}loan/returned/${id}`)
  }

  borrowed(id: number){
    return this.http.delete<void>(`${this.url}loan/borrowed/${id}`)
  }

  delete(id: number){
    return this.http.delete<void>(`${this.url}loan/${id}`)
  }
  
}
