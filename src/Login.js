import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

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

export default Login;
