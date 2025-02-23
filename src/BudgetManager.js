import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import {
  Container,
  Select,
  MenuItem,
  Card,
  Box,
  Chip,
  CardContent,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  ListItemText,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { Delete as DeleteIcon, Edit } from "@mui/icons-material";
import axios from "axios";

function BudgetManager() {
  const [income, setIncome] = useState(
    () => Number(localStorage.getItem("income")) || 0
  );
  const [categoryPercentage, setCategoryPercentage] = useState("");
  const [category, setCategory] = useState("");
  const [customCategories, setCustomCategories] = useState(
    () => JSON.parse(localStorage.getItem("customCategories")) || []
  );
  const [customCategory, setCustomCategory] = useState("");
  const [budgetedCategories, setBudgetedCategories] = useState(
    () => JSON.parse(localStorage.getItem("budgetedCategories")) || {}
  );
  const [expensesData, setExpensesData] = useState(
    () => JSON.parse(localStorage.getItem("expensesData")) || {}
  );
  const [openSummary, setOpenSummary] = useState(false);
  const navigate = useNavigate();

  const defaultCategories = [
    "Entertainment",
    "Savings",
    "Shopping",
    "Appliances",
  ];

  useEffect(() => {
    localStorage.setItem("income", income);
    localStorage.setItem("customCategories", JSON.stringify(customCategories));
    localStorage.setItem(
      "budgetedCategories",
      JSON.stringify(budgetedCategories)
    );
    localStorage.setItem("expensesData", JSON.stringify(expensesData));
  }, [income, customCategories, budgetedCategories, expensesData]);

  const addCategory = () => {
    if (
      !categoryPercentage ||
      isNaN(categoryPercentage) ||
      categoryPercentage <= 0
    ) {
      alert("Please enter a valid category percentage.");
      return;
    }
    if (income <= 0) {
      alert("Please enter a valid income.");
      return;
    }
    if (category) {
      const budgetedAmount = (parseFloat(categoryPercentage) / 100) * income;
      localStorage.setItem(`budget_${category}`, budgetedAmount);
      setBudgetedCategories({
        ...budgetedCategories,
        [category]: budgetedAmount,
      });
      navigate(`/expenses/${category}`, { state: { budgetedAmount } });
      setCategoryPercentage("");
      setCategory("");
    }
  };

  const addCustomCategory = () => {
    if (
      customCategory &&
      !defaultCategories.some(
        (cat) => cat.toLowerCase() === customCategory.toLowerCase()
      ) &&
      !customCategories.some(
        (cat) => cat.toLowerCase() === customCategory.toLowerCase()
      )
    ) {
      setCustomCategories([...customCategories, customCategory]);
      setCustomCategory("");
    }
  };

  const totalBudgeted = Object.values(budgetedCategories).reduce(
    (acc, val) => acc + Number(val),
    0
  );
  const totalSpent = Object.values(expensesData).reduce(
    (acc, cat) =>
      acc + (cat.expenses?.reduce((sum, exp) => sum + exp.amount, 0) || 0),
    0
  );
  const remainingBudget = totalBudgeted - totalSpent;
  const remainingIncome = Math.max(income - totalBudgeted, 0);

  const colors = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28AD6",
    "#F75990",
    "#66CCCC",
  ];
  const pieData = Object.entries(budgetedCategories).map(([cat, amount]) => ({
    name: cat,
    value: amount,
  }));

  const barData = Object.entries(expensesData).map(([cat, data]) => ({
    name: cat,
    spent: data.expenses?.reduce((sum, exp) => sum + exp.amount, 0) || 0,
  }));

  return (
    <Container maxWidth="md">
      <Card sx={{ p: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Budget Manager
          </Typography>
          <Typography variant="h6">
            Total Budgeted: KES {totalBudgeted.toFixed(2)}
          </Typography>
          <Typography variant="h6">
            Total Spent: KES {totalSpent.toFixed(2)}
          </Typography>
          <Typography variant="h6">
            Remaining Budget: KES {remainingBudget.toFixed(2)}
          </Typography>
          <Typography variant="h6">
            Remaining Income: KES {remainingIncome.toFixed(2)}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Income"
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Category Percentage"
                type="number"
                value={categoryPercentage}
                onChange={(e) => setCategoryPercentage(e.target.value)}
                margin="normal"
              />
              <Select
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{ mt: 2 }}
              >
                {[...defaultCategories, ...customCategories].map((cat) => (
                  <MenuItem
                    key={cat}
                    value={cat}
                    disabled={budgetedCategories[cat]}
                  >
                    {cat}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                fullWidth
                label="Add Custom Category"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                margin="normal"
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={addCustomCategory}
                sx={{ mt: 2, marginRight: 2 }}
              >
                Add Category
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={addCategory}
                sx={{ mt: 2 }}
              >
                Go to Expenses
              </Button>
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpenSummary(true)}
            sx={{ mt: 4, display: "block", mx: "auto" }}
          >
            View Expense Summary
          </Button>
          <Dialog
            open={openSummary}
            onClose={() => setOpenSummary(false)}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle>Expense Summary</DialogTitle>
            <DialogContent>
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center">
                    Budget Allocation
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ name, value }) =>
                          `${name}: ${(value / income) * 100}%`
                        }
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center">
                    Expenses Per Category
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="spent" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenSummary(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    </Container>
  );
}
