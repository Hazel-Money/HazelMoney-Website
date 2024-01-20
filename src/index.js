import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStyle } from './styles/GlobalStyle';
import { GlobalProvider } from './context/globalContext';
import LoginSignup from './components/Login/login'

const root = ReactDOM.createRoot(document.getElementById('root'));

function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin != 0) return null;
  }
  else
  {
      begin += 2;
      var end = document.cookie.indexOf(";", begin);
      if (end == -1) {
      end = dc.length;
      }
  }
  // because unescape has been deprecated, replaced with decodeURI
  //return unescape(dc.substring(begin + prefix.length, end));
  return decodeURI(dc.substring(begin + prefix.length, end));
} 

console.log(getCookie('jwt'));
if (getCookie('jwt')) {
  root.render(
    <React.StrictMode>
      <GlobalStyle />
        <GlobalProvider>
          <App />
        </GlobalProvider>
    </React.StrictMode>
  );
} else{
  root.render(
    <React.StrictMode>
      <GlobalStyle />
        <GlobalProvider>
          <LoginSignup />
        </GlobalProvider>
    </React.StrictMode>
  );
}
