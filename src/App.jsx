import React from 'react';
import Home from './pages/home/home';
import About from './pages/about/about';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import { ConvexProvider, ConvexReactClient } from "convex/react";



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  const convex = new ConvexReactClient('https://third-canary-678.convex.cloud');

  return (
    <ConvexProvider client={convex}>

    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Router>
    </ConvexProvider>

  );
}

export default App;