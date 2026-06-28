import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Stars from './components/Stars';
import Home from './pages/Home';
import Project from './pages/Project';
import Demo from './pages/Demo';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <Router>
      <div style={{ 
        minHeight: '100vh', 
        background: '#0a0a1a',
        color: '#ffffff',
        fontFamily: "'Segoe UI', sans-serif"
      }}>
        <Stars />
        <Navbar />
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/project" element={<Project />} />
          <Route path="/demo"    element={<Demo />} />
          <Route path="/about"   element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;