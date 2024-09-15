import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Home() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`home-container ${theme}`} style={{ height: '100vh', overflow: 'clip', width:'100vw', background: 'white' ? 'light' : 'dark'}}>
      <div className="logo2" />
      <div className="home-left">
        <h1>Kerrigan</h1>
        <p>Open trading with freedom and confidence</p>
        <div className="button-container">
          <button className="btn start-btn">Start</button>
          <button className="btn contact-btn">Contact us</button>
        </div>
        <div className="tags">
          <p>LLM Relation</p>
          <p>Numerical Analysis</p>
          <p>Cloud</p>
          <p>Open</p>
        </div>
      </div>

      <div className="home-right">
        <div className="phone-mockup"></div>
      </div>

      <div className="auth-buttons">
        <button className="login-btn" onClick={handleLoginClick}>Login</button>
        <button className="signup-btn" onClick={handleSignupClick}>Sign up</button>
      </div>

      <div className="theme-toggle">
        <button className="light-btn" onClick={toggleTheme}>Light</button>
        <button className="dark-btn" onClick={toggleTheme}>Dark</button>
      </div>
    </div>
  );
}

export default Home;
