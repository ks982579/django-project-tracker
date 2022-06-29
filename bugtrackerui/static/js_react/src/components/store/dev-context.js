import React, { useState, useEffect, useReducer, cloneElement } from "react";

import AuthActions from "../../actions/auth-actions";
import OwnershipCard from "../projects/OwnershipCard";
import LinkedList, { ProjectNode, TaskNode } from "./linked-list";

const DevContext = React.createContext({
    projectData: [],
    taskData: [],
    update: {},
    newTask: {},
});

/*
    Thinking... Create the linked list. Each would need a node. 
    The nodes would link to embedded linked lists. 
    Each PROJECT begins the LinkedList.
    > Search through lists to find Child Tasks.
    > Child Tasks must be linked in ORDER!!! (probably by end-date)
    > Each Task then links Child Tasks, etc...
*/

export const DevContextProvider = (props) => {
    const [projectData, setProjectData] = useState([]);
    const [taskData, setTaskData] = useState([]);
    const [runUpdate, setRunUpdate] = useState(0);
    
    // Context Start Now!!!
    console.log('Running DevContextProvider')

    const callAPI = () => {
        console.log(`%cCalling API...`, "background-color: black; color: red;")
        setRunUpdate((runUpdate + 1) % 2)
    }

    //Check if user is already logged in
    useEffect(async () => {
        console.log('DevContextProvider useEffect')
        // Fetching PROJECTS
        const newProjects = await AuthActions.fetchAllProjects();
        console.log(`fetching Projects -> ${newProjects}`)
        setProjectData(LinkedList.createProjectList(newProjects));
        console.log('Projects Stored');

        //Fetching TASKS
        console.log('Fetching Tasks...');
        const newTasks = await AuthActions.fetchAllData();
        setTaskData(LinkedList.createTaskList(newTasks));
        console.log('Tasks Stores...')
    }, [runUpdate]);

    const newTaskHandler = (newTaskObj) => {
        setTaskData((prevState)=> {
            return [...prevState, newTaskObj];
        });
    }

    //May want to change 'value' to be State / reducer?

    return (
        <DevContext.Provider value={{
            projectData: projectData,
            taskData: taskData,
            update: callAPI,
            newTask: newTaskHandler,
        }}>
            {props.children}
        </DevContext.Provider>
    )
}

export default DevContext;