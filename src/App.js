import HomePage from "./components/HomePage"
import Create from "./components/Create"
import Encounter from "./components/Encounter"
import Profile from "./components/Profile"
import Roster from "./components/Roster"
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
  const [trainer, setTrainer] = useState(null)

  function onTrainer(newTrainer) {
    setTrainer(newTrainer)
  }

  return (
    <>
      <BrowserRouter>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography noWrap component={Link} to="/" variant="h6" sx={{ textDecoration: "none", boxShadow: "none" }}>
                Catch that Pokemon!
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/encounter" element={<Encounter trainer={trainer} />} />
          <Route path="/profile" element={<Profile onTrainer={onTrainer} />} />
          <Route path="/roster" element={<Roster trainer={trainer} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
