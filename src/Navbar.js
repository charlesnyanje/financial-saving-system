import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function Navbar() {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Logout failed");
      }
  
      // Clear authentication data (JWT, localStorage, etc.)
      localStorage.removeItem("token");
      window.location.href = "/"; // Redirect to login
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  
  return (
    <AppBar position="static" sx={{ mb: 0 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Budget App
        </Typography>
        <Button color="inherit" onClick={handleLogout}>LOGOUT</Button>
        <Button color="inherit" onClick={() => navigate("/expenses")}>EXPENSES</Button>
        <Button color="inherit" onClick={() => navigate("/budget")}>BUDGET</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
