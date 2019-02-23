import React from 'react';
import './App.css';

import signIn from 'sign-in-with-burner';

const SignInWithBurner = (props) => {
  return (
    <div>
      <h1>MyDai</h1>
      <p>send DAI from your burner wallet to friends.</p>
      <button className= "btn btn-custom" id="sign-in" onClick={() => handleClick(props.updateAddress)}>
        Sign in with Burner
      </button>
    </div>
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
