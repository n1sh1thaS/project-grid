import React from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Board from "./pages/Board";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/board" element={<Board />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
