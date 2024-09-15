import React from 'react';
import Home from './pages/home/home';
import About from './pages/about/about';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ClerkProvider } from '@clerk/clerk-react';
import Signup from './pages/login/signup';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  const convex = new ConvexReactClient('https://third-canary-678.convex.cloud');
  const clerkFrontendApi = "pk_test_Y2xhc3NpYy1hcGhpZC0yOS5jbGVyay5hY2NvdW50cy5kZXYk"; // Replace with your Clerk frontend API

  return (
    <ClerkProvider publishableKey={clerkFrontendApi}>

    <ConvexProvider client={convex}>

    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
    </Router>
    </ConvexProvider>
    </ClerkProvider>

  );
}

export default App;