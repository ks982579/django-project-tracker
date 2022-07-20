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
    Reset: 'Reset',
}

const reducerFunction = (prevState, action) => {
    // clicking on a project comes with project info
    if(action.type == Actions.Project){
        console.log("4.) Dispatch Function Setting payload")
        return {
            toEditProfile: false,
            isProjectSelected: true,
            selectedProject: action.payload,
        }
    }
    if(action.type == Actions.Profile){
        return {
            toEditProfile: true,
            isProjectSelected: false,
        }
    }
    if(action.type == Actions.Reset){
        return initReducerState;
    }
    return prevState;
}

function App() {
    console.log("Render <App/>")
    const ctx = useContext(AuthContext);
    const [wantsToLogin, setWantsToLogin] = useState(false);
    const [wantsToSignup, setWantsToSignup] = useState(false);
    // const [wantsToEditProfile, setWantsToEditProfile] = useState(false);
    // const [projectSelected, setProjectSelected] = useState(false)

    const [reducerState, dispatchFn] = useReducer(reducerFunction, initReducerState);

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
        if(!reducerState.toEditProfile){
            dispatchFn({type: Actions.Profile});
        }
    }
    const selectProjectHandler = (data) =>{
        console.log("3.) selectProjectHandler")
        dispatchFn({type: Actions.Project, payload: data});
    }
    const projectResetHandler = () =>{
        dispatchFn({type: Actions.Reset});
    }

    console.log('<App/> done...')
    console.log(`profile = ${reducerState.toEditProfile}`);
    console.log(`project = ${reducerState.isProjectSelected}`);
    return (
        <DevContextProvider>
            <Navbar loginClick={loginYes} signupClick={signupYes} onProfileClick={editProfileHandler}/>
            {!wantsToLogin && !wantsToSignup && !ctx.isLoggedIn && <Greeting />}
            {wantsToLogin && !ctx.isLoggedIn && <LoginForm cancelClick={loginNo} />}
            {wantsToSignup && !ctx.isLoggedIn && <SignupForm cancelClick={signupNo} />}
            {ctx.isLoggedIn && <Dashboard 
                boolProfile={reducerState.toEditProfile} 
                setEditProfile={editProfileHandler}
                boolProject={reducerState.isProjectSelected}
                projectSelected={reducerState.selectedProject}
                setProjectSelected={selectProjectHandler}
                resetProject={projectResetHandler}/>}
        </DevContextProvider>
    );
}

export default App;
