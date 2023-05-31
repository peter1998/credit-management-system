// loan-list.component.ts
import { Component, OnInit } from '@angular/core';
import { LoanService } from '../services/loan.service';
import { Loan } from '../models/loan.model';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.sass'],
})
export class LoanListComponent implements OnInit {
  loans: Loan[] = [];
  displayedColumns: string[] = [
    'borrowerName',
    'amount',
    'term',
    'monthlyPayment',
  ];

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loanService.getLoans().subscribe((loans) => {
      this.loans = loans.map((loan) => ({
        ...loan,
        monthlyPayment: Number(loan.amount) / Number(loan.term),
      }));
    });
  }
}
