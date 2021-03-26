import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import App from './components/App';

import Firebase, { FirebaseContext } from './components/Firebase';


const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;

  font-family: 'Crimson Text', serif;
  
  & p, li, input, select, button {
    font-size: 18px;
  }

  & h1, h2 {
    font-family: 'Lato', sans-serif;
  }
}

::-webkit-scrollbar {
  display: none;
}
`


ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={new Firebase()}>
      <GlobalStyle />
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode >,
  document.getElementById('root')
);
