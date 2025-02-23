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
