import React from 'react';
import './login.css';
import { SignIn } from '@clerk/clerk-react';

function Login() {
  return (
    <div className="login-container">
    <div className="login-form">
      <div className="logo-container"></div>
      
      {/* Clerk's SignIn component */}
      <SignIn
        path="/login"
        routing="path"
        signUpUrl="/sign-up"
        afterSignInUrl="/dashboard" // Redirect after sign-in
      />
    </div>
    
    <div className="login-bg">
      {/* You can add an image as the background here */}
    </div>
  </div>
  );
}

export default Login;