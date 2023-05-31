const express = require("express");
const sequelize = require("./database");
const Loan = require("./loan");
const Payment = require("./payment");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Create a new loan
app.post("/loans", async (req, res) => {
  try {
    const { borrowerName, amount } = req.body;

    // Check that the borrower does not already have loans totaling more than 80,000 BGN
    const existingLoans = await Loan.findAll({ where: { borrowerName } });
    const totalExistingLoanAmount = existingLoans.reduce(
      (total, loan) => total + loan.amount,
      0
    );
    if (totalExistingLoanAmount + amount > 80000) {
      return res
        .status(400)
        .json({
          error: "Borrower cannot have loans totaling more than 80,000 BGN",
        });
    }

    const loan = await Loan.create(req.body);
    res.status(201).json(loan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all loans
app.get("/loans", async (req, res) => {
  try {
    const loans = await Loan.findAll();
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Make a payment on a loan
app.post("/payments", async (req, res) => {
  try {
    const { loanId, amount } = req.body;

    // Check that the payment does not exceed the amount due on the loan
    const loan = await Loan.findByPk(loanId);
    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }
    if (amount > loan.amount) {
      return res
        .status(400)
        .json({ error: "Payment cannot exceed the amount due on the loan" });
    }

    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created!");
    // Start the server
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
