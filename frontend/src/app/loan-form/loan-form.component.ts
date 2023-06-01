import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { LoanService } from '../services/loan.service';
import { Loan } from '../models/loan.model';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.sass'],
})
export class LoanFormComponent {
  form: FormGroup;

  constructor(private loanService: LoanService) {
    this.form = new FormGroup({
      borrowerName: new FormControl('', Validators.required),
      amount: new FormControl(0, [Validators.required, Validators.min(0)]),
      term: new FormControl(0, [Validators.required, Validators.min(0)]),
    });
  }

  onSubmit() {
    const loan: Loan = this.form.value;

    this.loanService
      .getLoansForBorrower(loan.borrowerName)
      .subscribe((loans) => {
        const totalLoanAmount = loans.reduce(
          (total, loan) => total + loan.amount,
          0
        );

        if (totalLoanAmount + loan.amount > 80000) {
          console.error(
            'Total loan amount for borrower cannot exceed 80,000 BGN'
          );
          return;
        }

        this.loanService.createLoan(loan).subscribe(
          (response) => console.log(response),
          (error) => console.error(error)
        );
      });
  }
}
