import React, { useState, useContext } from 'react';
import './App.css';

import Navbar from './components/ui/Navbar';
import LoginForm from './components/authent/LoginForm';
import SignupForm from './components/authent/SignupForm';
import Dashboard from './components/projects/Dashboard';

import AuthContext from './components/store/auth-context';
import Greeting from './components/projects/Greeting';
import { DevContextProvider } from './components/store/dev-context';



function App() {
    const ctx = useContext(AuthContext);
    const [wantsToLogin, setWantsToLogin] = useState(false);
    const [wantsToSignup, setWantsToSignup] = useState(false);

    const loginYes = () => {
        setWantsToLogin(true);
        if(wantsToSignup) {
            setWantsToSignup(false);
        }
    }
    const loginNo = () => {
        setWantsToLogin(false);
    }
    const signupYes = () => {
        setWantsToSignup(true);
        if(wantsToLogin){
            setWantsToLogin(false);
        }
    }
    const signupNo = () => {
        setWantsToSignup(false);
    }

    return (
        <DevContextProvider>
            <Navbar loginClick={loginYes} signupClick={signupYes} />
            {!wantsToLogin && !wantsToSignup && !ctx.isLoggedIn && <Greeting />}
            {wantsToLogin && !ctx.isLoggedIn && <LoginForm cancelClick={loginNo} />}
            {wantsToSignup && !ctx.isLoggedIn && <SignupForm cancelClick={signupNo} />}
            {ctx.isLoggedIn && <Dashboard />}
        </DevContextProvider>
    );
}

export default App;
