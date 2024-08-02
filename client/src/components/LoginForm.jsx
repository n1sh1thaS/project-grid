import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginInfo = {
      email,
      password,
    };
    const res = await axios.post(
      "http://localhost:3000/api/users/login",
      loginInfo
    );
    const { data } = res;
    localStorage.setItem("token", data.token);
    window.location = "/board";
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography variant="h3" sx={{ fontSize: 35, marginBottom: 5 }}>
          Login to Project Grid
        </Typography>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={() => setEmail(res.target.value)}
          sx={{ width: 350 }}
          fullWidth
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          onChange={() => setPassword(res.target.value)}
          type="password"
          sx={{ width: 350 }}
          fullWidth
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ background: "black", width: 200, height: 40 }}
        >
          Login
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
