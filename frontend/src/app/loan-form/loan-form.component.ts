import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.sass'],
})
export class LoanFormComponent {
  borrowerName = '';
  amount = '';
  term = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const loan = {
      borrowerName: this.borrowerName,
      amount: this.amount,
      term: this.term,
    };

    this.http.post('http://localhost:3000/loans', loan).subscribe(
      (response) => console.log(response),
      (error) => console.error(error)
    );
  }
}
