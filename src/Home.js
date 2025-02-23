import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  Box,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

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

export default Home;
