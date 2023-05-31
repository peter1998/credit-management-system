import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:3000/payments'; // replace with your API URL

  constructor(private http: HttpClient) {}

  makePayment(loanId: number, amount: number): Observable<void> {
    return this.http.post<void>(this.apiUrl, { loanId, amount });
  }
}
