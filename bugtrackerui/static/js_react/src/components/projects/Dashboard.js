import React, { useReducer } from "react";

//import other modules
import DeveloperCard from "./DeveloperCard";
import Card from "../ui/Card";
import OwnershipCard from "./OwnershipCard";

import styles from './Dashboard.module.css';
import NewProjectCont from "./create_project/NewProjectCont";

/* Many different Screens can be managed more easily with useReducer. */
/* That should also ensure components re-render for changes */
// Initial State is everything false!
let initDisplayState = {
    newProject: false,
    management: false,
    development: false,
}

const displayReducer = (prevState, action) => {
    if (action.type === 'NEW_PROJECT') {
        return { ...initDisplayState, newProject: true }
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

    // Reducer hook
    const [displayState, setDisplayState] = useReducer(displayReducer, initDisplayState)
    
    // New Project Click Handler
    const newProjectHandler = event => {
        setDisplayState({type: 'NEW_PROJECT'})
    }
    const clickManagementHandler = event => {
        setDisplayState({type: 'MANAGEMENT'})
    }
    const clickDevelopmentHandler = event => {
        setDisplayState({type: 'DEVELOPMENT'})
    }

    //Clicking on internal Project Cards must render information. 
    const onOwnerClickHandler = (event, jsonData) => {
        console.log('OwnerCard')
        console.log(jsonData);
    }
    const onDeveloperClickHandler = (event, jsonData) => {
        console.log('DevCard')
        console.log(jsonData);
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
                    <Card>
                        <h2 onClick={newProjectHandler}>New Project +</h2>
                        {displayState.newProject && <NewProjectCont/>}
                    </Card>
                    <OwnershipCard onClick={clickManagementHandler} onProjectClick={onOwnerClickHandler} displayState={displayState.management} />
                    <DeveloperCard onClick={clickDevelopmentHandler} onProjectClick={onDeveloperClickHandler} displayState={displayState.development} />
                </div>
                <div>
                    <p>for the actual projects</p>
                </div>
                <div>
                    <p>for the tasks for projects...</p>
                </div>
            </div>
        </Card>
    )
};

export default Dashboard