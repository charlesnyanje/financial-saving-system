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
