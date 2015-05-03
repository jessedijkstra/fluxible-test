import React from 'react';
import app from './app';
import PushState from './services/PushState';

window.React = React;

const context = app.createContext();
const pushState = new PushState(context);

pushState.run();

React.render(context.createElement(), document.getElementById('app'));
