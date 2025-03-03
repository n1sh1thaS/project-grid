import React from "react";
import NavBar from "../components/NavBar";
import LoginForm from "../components/LoginForm";
import { Typography, Grid } from "@mui/material";

const Login = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <NavBar showSignup />
        </Grid>
        <Grid item xs={12} marginTop={18}>
          <Typography variant="h4" align="center">
            <LoginForm />
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
