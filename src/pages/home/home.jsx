import React from 'react';
import './home.css';

function Home() {
  return (
    <div className="home-container" style={{height:'100vh', overflow:'clip'}}>
      <div className="logo2"/>
      <div className="home-left">
        <h1>Kerrigan</h1>
        <p>Open trading with freedom and confidence</p>
        <div className="button-container">
          <button className="btn start-btn">Start</button>
          <button className="btn contact-btn">Contact us</button>
        </div>
        <div className="tags">
          <p>GPU</p>
          <p>FPGA</p>
          <p>Cloud</p>
          <p>Open</p>
        </div>
      </div>

      <div className="home-right">
        <div className="phone-mockup"></div>
      </div>
      
      <div className="auth-buttons">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign up</button>
      </div>

      <div className="theme-toggle">
        <button className="light-btn">Light</button>
        <button className="dark-btn">Dark</button>
      </div>
    </div>
  );
}

export default Home;