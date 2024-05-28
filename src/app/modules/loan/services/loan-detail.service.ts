import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILoanDetail } from '../models/loan-detail.model';

@Injectable({
  providedIn: 'root'
})
export class LoanDetailService {

  private url: string = environment.apiUrl+'/';

  constructor(private http: HttpClient) { }

  getForIdLoan(id: number){
    return this.http.get<ILoanDetail>(`${this.url}loanDetail/${id}`)
  }

  delete(id: number){
    return this.http.delete<void>(`${this.url}loanDetail/${id}`)
  }
}
