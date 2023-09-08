import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { ProductDataProvider } from './Components/ContextProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <ProductDataProvider>
      <BrowserRouter>
        <App />
        <ToastContainer autoClose={1000} position='bottom-right' closeOnClick theme='dark' />
      </BrowserRouter>
    </ProductDataProvider>
  </Provider>
);


