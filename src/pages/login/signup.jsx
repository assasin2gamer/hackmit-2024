import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import './signup.css'; // You can create your own CSS to style the page

function SignUpPage() {
  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="logo-container"></div>

        {/* Clerk's SignUp component */}
        <SignUp
          path="/sign-up"
          routing="path"
          afterSignUpUrl="/dashboard" // Redirect after successful sign-up
        />
      </div>
      
      <div className="signup-bg">
        {/* You can add a background image or styling */}
      </div>
    </div>
  );
}

export default SignUpPage;
