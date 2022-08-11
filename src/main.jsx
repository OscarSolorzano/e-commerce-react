import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import "bootswatch/dist/yeti/bootstrap.min.css";
import './styles/navbar.css';
import './styles/home.css';
import './styles/productdetail.css';
import './styles/purchases.css';
import './styles/cart.css';
import './styles/user.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

