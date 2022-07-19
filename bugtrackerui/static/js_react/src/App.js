import React, { useState, useContext, useReducer } from 'react';
import './App.css';

import Navbar from './components/ui/Navbar';
import LoginForm from './components/authent/LoginForm';
import SignupForm from './components/authent/SignupForm';
import Dashboard from './components/projects/Dashboard';

import AuthContext from './components/store/auth-context';
import Greeting from './components/projects/Greeting';
import { DevContextProvider } from './components/store/dev-context';

let initReducerState = {
    toEditProfile: false,
    isProjectSelected: false,
    selectedProject: {},
}
const Actions = {
    Profile: 'Profile',
    Project: 'Project',
}

const reducerFunction = (prevState, action) => {
    return prevState;
}

function App() {
    console.log("Render <App/>")
    const ctx = useContext(AuthContext);
    const [wantsToLogin, setWantsToLogin] = useState(false);
    const [wantsToSignup, setWantsToSignup] = useState(false);
    const [wantsToEditProfile, setWantsToEditProfile] = useState(false);
    const [projectSelected, setProjectSelected] = useState(false)

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
    //Toggle Edit Profile
    const editProfileHandler = () => {
        if(wantsToEditProfile){
            console.log('setting Profile Edit to false')
            setWantsToEditProfile(false);
        } else {
            setProjectSelected(false);
            setWantsToEditProfile(true);
        }
    }

    return (
        <DevContextProvider>
            <Navbar loginClick={loginYes} signupClick={signupYes} onProfileClick={editProfileHandler}/>
            {!wantsToLogin && !wantsToSignup && !ctx.isLoggedIn && <Greeting />}
            {wantsToLogin && !ctx.isLoggedIn && <LoginForm cancelClick={loginNo} />}
            {wantsToSignup && !ctx.isLoggedIn && <SignupForm cancelClick={signupNo} />}
            {ctx.isLoggedIn && <Dashboard 
                editProfile={wantsToEditProfile} 
                setEditProfile={editProfileHandler}
                projectSelected={projectSelected}
                setProjectSelected={setProjectSelected}/>}
        </DevContextProvider>
    );
}

export default App;
