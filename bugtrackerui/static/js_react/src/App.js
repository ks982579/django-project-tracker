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
    toMessages: false,
    toEditProfile: false,
    isProjectSelected: false,
    toTeam: false,
    selectedProject: {},
}
const Actions = {
    Messages: 'Messages',
    Profile: 'Profile',
    Project: 'Project',
    Reset: 'Reset',
    Team: 'Team',
}

const reducerFunction = (prevState, action) => {
    // clicking on a project comes with project info
    if (action.type == Actions.Messages) {
        return {
            toMessages: true,
            toEditProfile: false,
            isProjectSelected: false,
            toTeam: false,
        }
    }
    if (action.type == Actions.Project) {
        return {
            toMessages: false,
            toEditProfile: false,
            isProjectSelected: true,
            toTeam: false,
            selectedProject: action.payload,
        }
    }
    if (action.type == Actions.Profile) {
        return {
            toMessages: false,
            toEditProfile: true,
            isProjectSelected: false,
            toTeam: false,
        }
    }
    if (action.type == Actions.Team) {
        return {
            ...initReducerState,
            toTeam: true,
        }
    }
    if (action.type == Actions.Reset) {
        return initReducerState;
    }
    return prevState;
}

function App() {
    console.log("Render <App/>")
    const ctx = useContext(AuthContext);
    const [wantsToLogin, setWantsToLogin] = useState(false);
    const [wantsToSignup, setWantsToSignup] = useState(false);

    const [reducerState, dispatchFn] = useReducer(reducerFunction, initReducerState);

    const loginYes = () => {
        setWantsToLogin(true);
        if (wantsToSignup) {
            setWantsToSignup(false);
        }
    }
    const loginNo = () => {
        setWantsToLogin(false);
    }
    const signupYes = () => {
        setWantsToSignup(true);
        if (wantsToLogin) {
            setWantsToLogin(false);
        }
    }
    const signupNo = () => {
        setWantsToSignup(false);
    }
    //Toggle Edit Profile
    const editProfileHandler = () => {
        if (!reducerState.toEditProfile) {
            dispatchFn({ type: Actions.Profile });
        }
    }
    const selectProjectHandler = (data) => {
        console.log("3.) selectProjectHandler")
        dispatchFn({ type: Actions.Project, payload: data });
    }
    const projectResetHandler = () => {
        dispatchFn({ type: Actions.Reset });
    }

    const checkMessages = () => {
        dispatchFn({ type: Actions.Messages })
    }
    const teamClickHandler = () => {
        dispatchFn({type: Actions.Team});
    }

    console.log('<App/> done...')
    console.log(`profile = ${reducerState.toEditProfile}`);
    console.log(`project = ${reducerState.isProjectSelected}`);
    return (
        <DevContextProvider>
            <Navbar loginClick={loginYes}
                signupClick={signupYes}
                onProfileClick={editProfileHandler}
                onMessagesClick={checkMessages}
                onTeamClick={teamClickHandler}/>
            {!wantsToLogin && !wantsToSignup && !ctx.isLoggedIn && <Greeting />}
            {wantsToLogin && !ctx.isLoggedIn && <LoginForm cancelClick={loginNo} />}
            {wantsToSignup && !ctx.isLoggedIn && <SignupForm cancelClick={signupNo} />}
            {ctx.isLoggedIn && <Dashboard
                boolMessages={reducerState.toMessages}
                boolProfile={reducerState.toEditProfile}
                setEditProfile={editProfileHandler}
                boolProject={reducerState.isProjectSelected}
                boolTeam={reducerState.toTeam}
                projectSelected={reducerState.selectedProject}
                setProjectSelected={selectProjectHandler}
                resetProject={projectResetHandler} />}
        </DevContextProvider>
    );
}

export default App;
