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
import { Delete as DeleteIcon, Edit } from "@mui/icons-material";
import axios from "axios";
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
import Navbar from "./Navbar";
const priorities = ["High", "Medium", "Low"];

function Home() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #3f51b5 30%, #1a237e 90%)",
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            p: 5,
            textAlign: "center",
            boxShadow: 5,
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <CardContent>
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              color="primary"
            >
              Financial Saving System
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
              Automate your financial planning and management
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/signup"
              sx={{ px: 4, py: 1, mx: 1 }}
            >
              Sign Up
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/login"
              sx={{ px: 4, py: 1, mx: 1 }}
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

// Budget Manager Component
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

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/signup", {
        email,
        password,
      });
      alert(res.data.message);
      navigate("/login"); // Redirect to login page after successful signup
    } catch (err) {
      setError(err.response?.data?.error || "Sign-up failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Sign Up
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <a
              href="#"
              onClick={() => navigate("/login")}
              style={{ color: "blue", cursor: "pointer" }}
            >
              Login
            </a>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      alert("Login Successful!");
      navigate("/budget"); // Redirect to a protected page
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            <a href="/forgot-password">Forgot Password?</a>
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <a
              href="#"
              onClick={() => navigate("/signup")}
              style={{ color: "blue", cursor: "pointer" }}
            >
              Sign Up
            </a>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/reset-password", {
        email,
        newPassword,
        confirmPassword,
      });
      setMessage(res.data.message);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Password reset failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Reset Password
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          {message && <Typography color="success">{message}</Typography>}

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleResetPassword}
          >
            Reset Password
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

function Expenses() {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
      >
        <Paper
          elevation={3}
          sx={{ p: 4, textAlign: "center", borderRadius: 2 }}
        >
          <Typography variant="h4" color="primary" gutterBottom>
            Expenses Overview
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Please select a category from the Budget to view details.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/budget" element={<BudgetManager />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/expenses/:category" element={<ExpenseDetails />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
