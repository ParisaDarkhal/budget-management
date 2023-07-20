import React, { useState, useContext } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../hooks/Auth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [username, setUsername] = useState(""); // State for username
  const [password, setPassword] = useState(""); // State for password
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ background: "#2E3B55" }}>
        <Toolbar sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button
              href="/"
              style={{
                color: "#fff",
                fontSize: 25,
                textTransform: "capitalize",
              }}
            >
              {" "}
              Budget Smart
            </Button>
          </Typography>
          <Box>
            {isAuthenticated ? (
              <div>
                <span>Welcome, {user.username}!</span>
                <Button
                  sx={{ ml: 5 }}
                  href="/login"
                  color="inherit"
                  onClick={handleLogout}
                >
                  Log out
                </Button>
              </div>
            ) : (
              <div>
                <Button href="/login" color="inherit">
                  Log in
                </Button>
              </div>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
