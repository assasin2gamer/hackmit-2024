import React from 'react';
import './login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-form">
        <div class="logo-container"></div>
        <form>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Email" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" />

          <button type="submit" className="login-button">Sign In</button>

          <a href="#" className="forgot-password">Forgot password?</a>
        </form>
      </div>
      <div className="login-bg">
        {/* You can add an image as the background here */}
      </div>
    </div>
  );
}

export default Login;