import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { PaymentService } from '../services/payment.service';
import { LoanService } from '../services/loan.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.sass'],
})
export class PaymentFormComponent {
  loanId: number = 0; // initial value
  amount: number = 0; // initial value

  constructor(
    private paymentService: PaymentService,
    private loanService: LoanService
  ) {}

  async makePayment(): Promise<void> {
    // Check that loanId and amount are valid
    if (this.loanId <= 0) {
      console.error('Invalid loan ID');
      return;
    }
    if (this.amount <= 0) {
      console.error('Invalid payment amount');
      return;
    }

    // Check that loanId exists in the database
    const loan = await firstValueFrom(this.loanService.getLoan(this.loanId));
    if (!loan) {
      console.error('Loan ID does not exist');
      return;
    }

    // Fetch payments for the loan
    const payments = await firstValueFrom(
      this.loanService.getPayments(this.loanId)
    );

    // Calculate the total payment amount
    let totalPaymentAmount = 0;
    if (payments) {
      totalPaymentAmount = payments.reduce(
        (total, payment) => total + payment.amount,
        0
      );
    }

    // Calculate the remaining balance of the loan
    const remainingBalance = loan.amount - totalPaymentAmount;

    // Check that amount does not exceed the remaining balance of the loan
    if (this.amount > remainingBalance) {
      console.error('Payment amount exceeds remaining balance of the loan');
      return;
    }

    this.paymentService.makePayment(this.loanId, this.amount).subscribe(() => {
      console.log('Payment made!');
    });
  }
}
