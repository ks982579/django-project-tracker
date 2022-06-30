import React, { useState, useEffect, useReducer, cloneElement } from "react";

import AuthActions from "../../actions/auth-actions";
import OwnershipCard from "../projects/OwnershipCard";
import { ProjectNode, TaskNode } from "./linked-list";

const DevContext = React.createContext({
    projectData: [],
    taskData: [],
    update: {},
    newTask: {},
    deleteTask: {},
});

const Actions = {
    Create: 'CREATE',
    Update: 'UPDATE',
    Delete: 'DELETE',
}

/*
    Thinking... Create the linked list. Each would need a node. 
    The nodes would link to embedded linked lists. 
    Each PROJECT begins the LinkedList.
    > Search through lists to find Child Tasks.
    > Child Tasks must be linked in ORDER!!! (probably by end-date)
    > Each Task then links Child Tasks, etc...
*/
// const taskReducer = (prevState, action) => {
//     if(action.type === Actions.Delete){
//         console.warn(`deleting ${action.payload}`);
//     }
// }

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
        //created projects Linked List
        let projectNodeList = newProjects.map(project => {
            return ProjectNode.create(project);
        })
        setProjectData(projectNodeList);
        console.log('Projects Stored');

        //Fetching TASKS
        console.log('Fetching Tasks...');
        const newTasks = await AuthActions.fetchAllData();
        //creates LL of all tasks
        // - But we want each project to have children tasks. 
        let taskNodeList = newTasks.map(task => {
            return TaskNode.create(task);
        })
        setTaskData(taskNodeList)
        console.log('Tasks Stores...')
    }, [runUpdate]);

    // Must Update!
    const newTaskHandler = (newTaskObj) => {
        setTaskData((prevState)=> {
            return [...prevState, newTaskObj];
        });
    }

    const deleteTaskHandler = (taskID) => {
        setTaskData((prevState) => {
            return prevState.filter(taskNode => taskNode.id != taskID);
        })
    }


    //May want to change 'value' to be State / reducer?

    return (
        <DevContext.Provider value={{
            projectData: projectData,
            taskData: taskData,
            update: callAPI,
            newTask: newTaskHandler,
            deleteTask: deleteTaskHandler,
        }}>
            {props.children}
        </DevContext.Provider>
    )
}

export default DevContext;