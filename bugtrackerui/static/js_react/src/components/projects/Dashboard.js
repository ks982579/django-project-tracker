import React, { useState, useReducer, memo } from "react";

//import other modules
import DeveloperCard from "./DeveloperCard";
import Card from "../ui/Card";

import styles from './Dashboard.module.css';
import NewProjectCont from "./create_project/NewProjectCont";
import ProjectEditScreen from "./management_editor/ProjectEditScreen";
import TaskDisplayScreen from "../development_editor/TaskDisplayScreen";
import ProfileContainer from "../profile_editor/ProfileContainer";
import MessagesDashboard from "../messages/MessagesDashboard";

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

const DumbTest = (props) => {
    console.log(props.bool);
    let answer = "FALSE";
    if(props.bool){
        answer = "TRUE";
    } else {
        answer = "FALSE";
    }
    return (
        <div>
            <p>Profile container == {answer}</p>
        </div>
    )
}

// +++++++++++++++++++++++++++++++++++++++++++++
// COMPONENT
// +++++++++++++++++++++++++++++++++++++++++++++
const Dashboard = (props) => {
    console.log('%c<Dashboard>',"color:green; font-weight:700;")
    // props.editProfile
    // Reducer hook
    const [displayState, setDisplayState] = useReducer(displayReducer, initDisplayState)
    // we can double up on state's use to toggle components too!
    const boolMessages = props.boolMessages;
    const boolProfile = props.boolProfile;
    const setEditProfile = props.setEditProfile;
    const projectSelected = props.projectSelected;
    const boolProject = props.boolProject;
    const setProjectSelected = props.setProjectSelected;
    
    // New Project Click Handler
    const newProjectHandler = event => {
        setDisplayState({type: 'NEW_PROJECT'})
    }
    const clickDevelopmentHandler = event => {
        if(props.editProfile){
            // toggle off if it is on
            props.setEditProfile();
        }
        setDisplayState({type: 'DEVELOPMENT'})
    }
    const onDeveloperClickHandler = (event, data) => {
        // Some checks to prevent re-rendering of data unnecessarily
        // if(boolProject){
        //     if(projectSelected.id !== data.id){
        //         setProjectSelected(data); //OG API data
        //     }
        // } else if(!boolProject){
        //     setProjectSelected(data); //OG API data
        // }
        // console.log(JSON.stringify(data));
        console.log("2.) In Developer Click Handler")
        setProjectSelected(data);
    }
    
    console.log(`%cRender ProfileContainer? ${boolProfile}`, "color:red;font-size:18px;")
    console.log(`%cRender Project? ${boolProject}`, "color:red;font-size:18px;")

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
                    {boolProject && <TaskDisplayScreen selected={projectSelected} whichProject={props.resetProject}/>}
                    {boolProfile && <ProfileContainer/>}
                    {boolMessages && <MessagesDashboard />}
                </div>
            </div>
        </Card>
    )
};

//{boolProfile && <ProfileContainer bool={boolProfile}/>}

export default Dashboard;

/**
 * passing in setProjectSelected because deleting functionality needs to reset it to false!
 */