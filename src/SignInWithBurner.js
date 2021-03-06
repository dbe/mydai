import React from 'react';
import './App.css';

import { login } from 'sign-in-with-burner';

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
  login({
    burnerUrl: 'https://xdai.io/loginV2',
    // burnerUrl: 'http://localhost:3001',
    siteName: 'MyDai'

  }).then(address => {
    updateAddress(address);

  }).catch(e => {
    console.log("Error logging in with burner: ", e)

  });
}

export default SignInWithBurner;
