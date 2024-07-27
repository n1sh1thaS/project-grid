import {TextField, Button, Box} from "@mui/material";

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: 2, alignItems: "center"}}>
      <TextField
        id="outlined-basic"
        label="Username"
        variant="outlined"
        sx={{width: 350}}
        fullWidth
      />
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
      >Get Started</Button>
    </Box>
  );
};

export default SignUpForm;
