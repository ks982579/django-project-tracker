import React, { useState, useReducer, memo } from "react";

//import other modules
import DeveloperCard from "./DeveloperCard";
import Card from "../ui/Card";

import styles from './Dashboard.module.css';
import NewProjectCont from "./create_project/NewProjectCont";
import ProjectEditScreen from "./management_editor/ProjectEditScreen";
import TaskDisplayScreen from "../development_editor/TaskDisplayScreen";
import ProfileContainer from "../profile_editor/ProfileContainer";

/* Many different Screens can be managed more easily with useReducer. */
/* That should also ensure components re-render for chadnges */
// Initial State is everything false!

// Project Selected in <DeveloperCard> must be sent to <TaskDisplayScreen>
let initDisplayState = {
    newProject: false,
    management: false,
    development: false,
}

const displayReducer = (prevState, action) => {
    if (action.type === 'NEW_PROJECT') {
        return { ...initDisplayState, newProject: !prevState.newProject }
    } else if(action.type === 'MANAGEMENT') {
        return {...initDisplayState, management: true}
    } else if(action.type === 'DEVELOPMENT') {
        return {...initDisplayState, development: true}
    }
    return prevState;
}

const quickStyles = {
    display: "flex",
    justifyContent: 'space-between',
    alignItems: 'center',
}

// +++++++++++++++++++++++++++++++++++++++++++++
// COMPONENT
// +++++++++++++++++++++++++++++++++++++++++++++
const Dashboard = (props) => {
    // props.editProfile
    // Reducer hook
    const [displayState, setDisplayState] = useReducer(displayReducer, initDisplayState)
    // we can double up on state's use to toggle components too!
    const [projectSelected, setProjectSelected] = useState(false);
    const [profileSelected, setProfileSelected] = useState(false);

    console.log(props.editProfile)
    if(props.editProfile && profileSelected != props.editProfile) {
        setProjectSelected(false);
        setProfileSelected(true);
    } else if(!props.editProfile && profileSelected != props.editProfile) {
        setProfileSelected(false);
    }

    console.log(`Project Selected: ${projectSelected}`);
    
    // New Project Click Handler
    const newProjectHandler = event => {
        setDisplayState({type: 'NEW_PROJECT'})
    }
    const clickDevelopmentHandler = event => {
        setDisplayState({type: 'DEVELOPMENT'})
    }
    const onDeveloperClickHandler = (event, data) => {
        // Some checks to prevent re-rendering of data unnecessarily
        if(projectSelected){
            if(projectSelected.id !== data.id){
                setProjectSelected(data); //OG API data
            }
        } else if(!projectSelected){
            setProjectSelected(data); //OG API data
        }
        if(profileSelected){
            props.setEditProfile();
        }
    }
    
    return (
        <Card>
            <div style={quickStyles}>
                <h1>
                    Dashboard
                </h1>
            </div>
            <div className={styles['dash-grid-container']}>
                <div>
                    <Card>Current Sprint</Card>
                    <Card>
                        <h2 onClick={newProjectHandler}>New Project +</h2>
                        {displayState.newProject && <NewProjectCont setDisplay={newProjectHandler}/>}
                    </Card>
                    <DeveloperCard onClick={clickDevelopmentHandler} onProjectClick={onDeveloperClickHandler} displayState={displayState.development} />
                </div>
                <div>
                    <p>for the actual projects / maybe 'New Project+' form?</p>
                    {profileSelected && <ProfileContainer />}
                    {projectSelected && <TaskDisplayScreen selected={projectSelected} whichProject={setProjectSelected}/>}
                </div>
            </div>
        </Card>
    )
};

export default memo(Dashboard);

/**
 * passing in setProjectSelected because deleting functionality needs to reset it to false!
 */