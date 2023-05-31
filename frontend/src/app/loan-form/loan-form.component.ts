import { Component } from '@angular/core';
import { LoanService } from '../services/loan.service';
import { Loan } from '../models/loan.model';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.sass'],
})
export class LoanFormComponent {
  borrowerName = '';
  amount: number = 0; // change type to number
  term = '';

  constructor(private loanService: LoanService) {}

  onSubmit() {
    const loan: Loan = {
      // use Loan type
      borrowerName: this.borrowerName,
      amount: this.amount,
      term: this.term,
    };

    // Fetch all loans for the borrower
    this.loanService
      .getLoansForBorrower(this.borrowerName)
      .subscribe((loans) => {
        // Calculate the total loan amount
        const totalLoanAmount = loans.reduce(
          (total, loan) => total + loan.amount,
          0
        );

        // Check if the total loan amount plus the new loan amount exceeds 80,000 BGN
        if (totalLoanAmount + this.amount > 80000) {
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
