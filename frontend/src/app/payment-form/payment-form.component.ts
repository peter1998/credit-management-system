import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { PaymentService } from '../services/payment.service';
import { LoanService } from '../services/loan.service';
import { Loan } from '../models/loan.model';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.sass'],
})
export class PaymentFormComponent {
  loans: Loan[] = [];
  selectedLoanId: number = 0;
  amount: number = 0;

  constructor(
    private paymentService: PaymentService,
    private loanService: LoanService
  ) {}

  ngOnInit(): void {
    this.loanService.getLoans().subscribe((loans) => {
      this.loans = loans;
    });
  }

  async makePayment(): Promise<void> {
    if (this.selectedLoanId <= 0) {
      console.error('Invalid loan ID');
      return;
    }
    if (this.amount <= 0) {
      console.error('Invalid payment amount');
      return;
    }

    const loan = await firstValueFrom(
      this.loanService.getLoan(this.selectedLoanId)
    );
    if (!loan) {
      console.error('Loan ID does not exist');
      return;
    }

    const payments = await firstValueFrom(
      this.loanService.getPayments(this.selectedLoanId)
    );

    let totalPaymentAmount = 0;
    if (payments) {
      totalPaymentAmount = payments.reduce(
        (total, payment) => total + payment.amount,
        0
      );
    }

    const remainingBalance = loan.amount - totalPaymentAmount;

    if (this.amount > remainingBalance) {
      console.error('Payment amount exceeds remaining balance of the loan');
      return;
    }

    this.paymentService
      .makePayment(this.selectedLoanId, this.amount)
      .subscribe(() => {
        console.log('Payment made!');
      });
  }
}
