import React from 'react'
import Landing from "./pages/Landing";
import Login from "./pages/Login"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
