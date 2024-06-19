import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILoan, ILoanDto } from '../model/loan.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private url: string = environment.apiUrl+'/v1';

  constructor(private http: HttpClient) { }

  getActive(){
    return this.http.get<ILoan[]>(`${this.url}/loans/active`)
  }

  getInactive(){
    return this.http.get<ILoan[]>(`${this.url}/loans/inactive`)
  }

  created(data: ILoanDto){
    return this.http.post<ILoan>(`${this.url}/loan/`, data);
  }

  update(id: number, data: ILoanDto){
    return this.http.put<ILoan>(`${this.url}/loan/${id}`, data);
  }

  removed(id: number){
    return this.http.delete<void>(`${this.url}/loan/removed/${id}`)
  }

  restore(id: number){
    return this.http.delete<void>(`${this.url}/loan/restore/${id}`)
  }

  delete(id: number){
    return this.http.delete<void>(`${this.url}/loan/${id}`)
  }
  
}
