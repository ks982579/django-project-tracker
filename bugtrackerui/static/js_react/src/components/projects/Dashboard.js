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
    console.log('%c<Dashboard>',"color:green; font-weight:700;")
    // props.editProfile
    // Reducer hook
    const [displayState, setDisplayState] = useReducer(displayReducer, initDisplayState)
    // we can double up on state's use to toggle components too!
    const projectSelected = props.projectSelected;
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
        if(projectSelected){
            if(projectSelected.id !== data.id){
                setProjectSelected(data); //OG API data
            }
        } else if(!projectSelected){
            setProjectSelected(data); //OG API data
        }
        if(props.editProfile){
            props.setEditProfile();
        }
    }
    
    console.log(`%cRender ProfileContainer? ${props.editProfile}`, "color:red;font-size:18px;")
    console.log(`%cRender Project? ${projectSelected}`, "color:red;font-size:18px;")
    let editProfileJSX = '';
    if(props.editProfile){
        editProfileJSX = <ProfileContainer/>
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
                    
                    {projectSelected && !props.editProfile && <TaskDisplayScreen selected={projectSelected} whichProject={setProjectSelected}/>}
                    {editProfileJSX}
                </div>
            </div>
        </Card>
    )
};

//

export default Dashboard;

/**
 * passing in setProjectSelected because deleting functionality needs to reset it to false!
 */