import React from 'react';
import './App.css';

import signIn from 'sign-in-with-burner';

const SignInWithBurner = (props) => {
  return (
    <button className= "btn btn-primary" id="sign-in" onClick={() => handleClick(props.updateAddress)}>
      Sign in with Burner
    </button>
  );
}

function handleClick(updateAddress) {
  signIn({
    // burnerUrl: 'https://xdai.io/login',
    burnerUrl: 'http://localhost:3001',
    // burnerUrl: 'https://buffidai.io/login',
    siteName: 'MyDai'

  }).then(address => {
    updateAddress(address);

  }).catch(e => {
    console.log("Error logging in with burner: ", e)

  });
}

export default SignInWithBurner;
