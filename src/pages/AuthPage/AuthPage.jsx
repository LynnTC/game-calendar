import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import './AuthPage.css'

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSetUser = (user) => {
    setUser(user);
    if (user) {
      window.location.href = '/';
    }
  };

  return (
    <main>
      <h1>Sign Up or Login to Begin</h1>
      <button onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Click To Log In To Existing User' : 'Click To Sign Up As A New User'}</button>
      { showSignUp ?
          <SignUpForm setUser={handleSetUser} />
          :
          <LoginForm setUser={handleSetUser} />
      }
    </main>
  );
}
