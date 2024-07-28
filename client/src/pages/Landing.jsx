import React from 'react'
import {Grid, Typography} from "@mui/material";
import NavBar from "../components/NavBar";
import SignUpForm from "../components/SignUpForm";
import landingPageImg from '../assets/landingPage.png';
import "../css/landing.css"

const Landing = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <NavBar showLogin={true} showSignup={false}/>
        </Grid>
          <Grid item xs={12} sm={4} marginLeft={11} marginTop={12}>
            <Typography variant="h3" align="center">
              Project Grid
            </Typography>
            <Typography variant="body1" align="center" marginBottom={8} sx={{fontSize: 25}}>
              where ideas turn into action
            </Typography>
            <Typography variant="h4" align="center">
              <SignUpForm />
            </Typography>
          </Grid>
          <Grid item xs={12} sm={7} marginTop={12}>
            <Typography variant="h3" align="center">
              <img className="landingImage" src={landingPageImg} alt=""/>
            </Typography>
          </Grid>
      </Grid>
    </>
  )
}

export default Landing