import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { AuthContextProvider } from './components/store/auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
);

// https://create-react-app.dev/docs/adding-a-sass-stylesheet/
/**
 * npm install sass
 * seems to work
 */