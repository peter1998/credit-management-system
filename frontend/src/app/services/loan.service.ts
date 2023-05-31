import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan.model';
import { Payment } from '../models/payment.mode';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  private apiUrl = 'http://localhost:3000/loans'; // replace with your API URL

  constructor(private http: HttpClient) {}

  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.apiUrl);
  }

  getLoan(id: number): Observable<Loan> {
    return this.http.get<Loan>(`${this.apiUrl}/${id}`);
  }

  // In LoanService
  getPayments(loanId: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/${loanId}/payments`);
  }

  createLoan(loan: Loan): Observable<Loan> {
    return this.http.post<Loan>(this.apiUrl, loan);
  }

  getLoansForBorrower(borrowerName: string): Observable<Loan[]> {
    return this.http.get<Loan[]>(
      `http://localhost:3000/loans?borrowerName=${borrowerName}`
    );
  }
}
