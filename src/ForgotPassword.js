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
import axios from "axios";

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
