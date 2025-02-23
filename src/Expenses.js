import React from "react";
import { Container, Box, Typography, Paper } from "@mui/material";

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
export default Expenses;
