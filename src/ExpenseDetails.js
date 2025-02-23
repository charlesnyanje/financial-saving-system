import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const priorities = ["High", "Medium", "Low"];

function ExpenseDetails() {
  const { category } = useParams();
  const location = useLocation();

  const storedBudgetedAmounts =
    JSON.parse(localStorage.getItem("budgetedAmounts")) || {};
  const budgetedAmount =
    location.state?.budgetedAmount || storedBudgetedAmounts[category] || 0;

  const [expensesData, setExpensesData] = useState(() => {
    return JSON.parse(localStorage.getItem("expensesData")) || {};
  });

  const [type, setType] = useState("");
  const [deadline, setDeadline] = useState("");
  const [percentage, setPercentage] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    localStorage.setItem("expensesData", JSON.stringify(expensesData));
  }, [expensesData]);

  useEffect(() => {
    const updatedBudgetedAmounts = {
      ...storedBudgetedAmounts,
      [category]: budgetedAmount,
    };
    localStorage.setItem(
      "budgetedAmounts",
      JSON.stringify(updatedBudgetedAmounts)
    );
  }, [category, budgetedAmount]);

  const addExpense = (cat) => {
    if (type && deadline && percentage) {
      const calculatedAmount = (parseFloat(percentage) / 100) * budgetedAmount;
      const newExpense = {
        type,
        deadline,
        paid: false,
        amount: calculatedAmount,
      };

      setExpensesData((prevData) => {
        const updatedData = { ...prevData };
        if (!updatedData[cat]) {
          updatedData[cat] = { budget: budgetedAmount, expenses: [] };
        }
        // Check for duplicates
        const isDuplicate = updatedData[cat].expenses.some(
          (expense) =>
            expense.type === newExpense.type &&
            expense.deadline === newExpense.deadline &&
            expense.amount === newExpense.amount
        );

        if (!isDuplicate) {
          updatedData[cat].expenses = [
            ...updatedData[cat].expenses,
            newExpense,
          ];
        }
        return updatedData;
      });

      setType("");
      setDeadline("");
      setPercentage("");
      setExpenseAmount(0);
      setCurrentCategory(null);
    }
  };

  const deleteExpense = (cat, index) => {
    setExpensesData((prevData) => {
      const updatedData = { ...prevData };
      if (updatedData[cat] && Array.isArray(updatedData[cat].expenses)) {
        const newExpenses = updatedData[cat].expenses.filter(
          (_, i) => i !== index
        );

        if (newExpenses.length === 0) {
          delete updatedData[cat];

          // Remove the category from budgetedCategories in localStorage
          const updatedBudgetedCategories = {
            ...JSON.parse(localStorage.getItem("budgetedCategories")),
          };
          delete updatedBudgetedCategories[cat];
          localStorage.setItem(
            "budgetedCategories",
            JSON.stringify(updatedBudgetedCategories)
          );
        } else {
          updatedData[cat].expenses = newExpenses;
        }
      }
      return updatedData;
    });
  };

  return (
    <Container maxWidth="md">
      <Card sx={{ p: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Expenses for {category}
          </Typography>
          <Typography variant="h6">
            Total Budgeted Amount: KES {budgetedAmount.toFixed(2)}
          </Typography>

          <TextField
            fullWidth
            label="Type of Expense"
            value={type}
            onChange={(e) => setType(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Percentage of Budgeted Category"
            type="number"
            value={percentage}
            onChange={(e) => {
              setPercentage(e.target.value);
              setExpenseAmount(
                (parseFloat(e.target.value) / 100) * budgetedAmount
              );
            }}
            margin="normal"
          />

          <Typography variant="h6">
            Expense Amount: KES {expenseAmount.toFixed(2)}
          </Typography>

          <TextField
            fullWidth
            label="Deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={() => addExpense(category)}
            sx={{ mt: 2 }}
          >
            Add Expense
          </Button>

          {Object.keys(expensesData).length > 0 && (
            <TableContainer component={Paper} sx={{ mt: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Category</b>
                    </TableCell>
                    <TableCell>
                      <b>Expense Type</b>
                    </TableCell>
                    <TableCell>
                      <b>Amount (KES)</b>
                    </TableCell>
                    <TableCell>
                      <b>Deadline</b>
                    </TableCell>
                    <TableCell>
                      <b>Actions</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(expensesData).map((cat) => (
                    <React.Fragment key={cat}>
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          <Typography variant="h6">{cat}</Typography>
                          <IconButton
                            color="primary"
                            onClick={() => setCurrentCategory(cat)}
                          >
                            +
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      {expensesData[cat]?.expenses?.map((expense, index) => (
                        <TableRow key={`${cat}-${index}`}>
                          <TableCell>{cat}</TableCell>
                          <TableCell>{expense.type}</TableCell>
                          <TableCell>KES {expense.amount.toFixed(2)}</TableCell>
                          <TableCell>{expense.deadline}</TableCell>
                          <TableCell>
                            <IconButton
                              color="error"
                              onClick={() => deleteExpense(cat, index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                      {currentCategory === cat && (
                        <TableRow>
                          <TableCell colSpan={5}>
                            <TextField
                              fullWidth
                              label="Type of Expense"
                              value={type}
                              onChange={(e) => setType(e.target.value)}
                              margin="normal"
                            />
                            <TextField
                              fullWidth
                              label="Percentage of Budgeted Category"
                              type="number"
                              value={percentage}
                              onChange={(e) => {
                                setPercentage(e.target.value);
                                setExpenseAmount(
                                  (parseFloat(e.target.value) / 100) *
                                    budgetedAmount
                                );
                              }}
                              margin="normal"
                            />
                            <TextField
                              fullWidth
                              label="Deadline"
                              type="date"
                              value={deadline}
                              onChange={(e) => setDeadline(e.target.value)}
                              margin="normal"
                              InputLabelProps={{ shrink: true }}
                            />
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => addExpense(cat)}
                            >
                              Save
                            </Button>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default ExpenseDetails;
