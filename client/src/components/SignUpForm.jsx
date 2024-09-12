import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import { addBoard } from "../services/board-service";
import axios from "../services/axios-config";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const user = {
      username,
      email,
      password,
    };
    try {
      const res = await axios.post("/users/register", user);
      const { data } = res;
      //console.log(data, data.token);
      localStorage.setItem("token", data.token);
      //console.log("enter function");
      //await createFirstBoard();
      //console.log("exit function");
      window.location = "/board";
    } catch (e) {
      console.log("user cannot be posted", e);
    }
  };
  /*const createFirstBoard = async () => {
    try {
      const res = await addBoard("Untitled", [], []);
      const { data } = res;
      console.log(data);
    } catch (err) {
      console.log("error creating first board", err);
    }
  };*/

  return (
    <form onSubmit={onSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          sx={{ width: 350 }}
          fullWidth
          onChange={(res) => setUsername(res.target.value)}
          value={username}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          sx={{ width: 350 }}
          fullWidth
          onChange={(res) => setEmail(res.target.value)}
          value={email}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          sx={{ width: 350 }}
          fullWidth
          onChange={(res) => setPassword(res.target.value)}
          value={password}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ background: "black", width: 200, height: 40 }}
        >
          Get Started
        </Button>
      </Box>
    </form>
  );
};

export default SignUpForm;
