import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { IntlProvider } from 'react-intl';


// Determinar el idioma del navegador
let userLanguage = navigator.language || navigator.userLanguage;
// Configurar los mensajes en base al idioma
let messages;

if (userLanguage.includes("es") || userLanguage.includes("ES") || userLanguage.includes("es-ES")){
  messages = require('./locales/es.json');
} else if (userLanguage.includes("en") || userLanguage.includes("EN") || userLanguage.includes("en-EN")) {
  messages = require('./locales/en.json');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <IntlProvider locale={userLanguage} messages={messages}>
      <App lang ={userLanguage}/>
    </IntlProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
