import {TextField, Button, Box, Typography} from "@mui/material";

const LoginForm = () => {
  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: 2, alignItems: "center"}}>
      <Typography variant="h3" sx={{fontSize: 35, marginBottom: 5}}>Login to Project Grid</Typography>
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        sx={{width: 350}}
        fullWidth
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type="password"
        sx={{width: 350}}
        fullWidth
      />
      <Button variant="contained" sx={{background: "black", width: 200, height: 40}}
      >Login</Button>
    </Box>
  );
};

export default LoginForm;
