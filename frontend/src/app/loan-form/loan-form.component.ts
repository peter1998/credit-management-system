import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
      borrowerName: new FormControl(''),
      amount: new FormControl(0),
      term: new FormControl(0),
    });
  }

  onSubmit() {
    const loan: Loan = this.form.value;

    // Fetch all loans for the borrower
    this.loanService
      .getLoansForBorrower(loan.borrowerName)
      .subscribe((loans) => {
        // Calculate the total loan amount
        const totalLoanAmount = loans.reduce(
          (total, loan) => total + loan.amount,
          0
        );

        // Check if the total loan amount plus the new loan amount exceeds 80,000 BGN
        if (totalLoanAmount + loan.amount > 80000) {
          console.error(
            'Total loan amount for borrower cannot exceed 80,000 BGN'
          );
          return;
        }

        // Create the new loan
        this.loanService.createLoan(loan).subscribe(
          (response) => console.log(response),
          (error) => console.error(error)
        );
      });
  }
}
