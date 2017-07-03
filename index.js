/*
* index.js file that inserts React into the DOM
*/

import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './src/components/App';

render(<App />, document.getElementById('app'));
