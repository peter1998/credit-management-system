export interface Payment {
  id: number;
  loanId: number;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}
