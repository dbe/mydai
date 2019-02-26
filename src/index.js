import React from 'react';
import { render } from 'react-dom';

import './index.css';

import App from './App';

import {BrowserRouter, Route} from 'react-router-dom';

render((
  <BrowserRouter>
    <Route exact path="/" component={App} />
  </BrowserRouter>
), document.getElementById('root'));
