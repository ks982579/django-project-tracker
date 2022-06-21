import React, { useState, useEffect, useReducer } from "react";

import AuthActions from "../../actions/auth-actions";
import OwnershipCard from "../projects/OwnershipCard";
import LinkedList, { ProjectNode, TaskNode } from "./linked-list";

const DevContext = React.createContext({
    projectData: [],
    update: {},
});

/*
    Thinking... Create the linked list. Each would need a node. 
    The nodes would link to embedded linked lists. 
    Each PROJECT begins the LinkedList.
    > Search through lists to find Child Tasks.
    > Child Tasks must be linked in ORDER!!! (probably by end-date)
    > Each Task then links Child Tasks, etc...
*/

const updateLinkedList = (prevState, action) => {
    const tasking = (currentTask, taskArray) => {
        //return "Specific function mostly for recursion..."
        console.log('%cinside Tasking',"color:red")
        for(let _efk of taskArray){
            if(_efk.parentTask == currentTask.id){
                currentTask.children.push = _efk;
                console.log('recursion')
                tasking(_efk, taskArray);
            }
        }
    }

    if (action.type === "NEW_LIST") {
        // the data should be object from json
        let data = action.val;
        // create a New Linked List
        const newLL = new LinkedList()
        if (data.length > 0) {
            try {
                for (let _efk of data) {
                    // Creating LinkedList for Project Data
                    newLL.push = new ProjectNode(_efk);
                    // - this process could be made more efficient by storing new node value. 
                }
            } catch (exceptionVar) {
                console.error(`Error instantiating Linked List -> ${exceptionVar}`)
            }
            console.log('%cProject Linked List Complete', "color: green")
        }
        // Saves new linkedlist over the old. 
        console.log("New List Created")
        return newLL;
    } else if (action.type === "NEW_TASKS") {
        /* 
        * 0.) Create LinkedList of Tasks!!!
        * 1.) Task to Parent
        * 2.) Task to Task
        */
       // We should take in a list. So we can pop the list to make it smaller as we create our LinkedList. 
       // array.slice(index);
       let currentNode = prevState.head
       // Cycle through Parents
        for (let _e = 0; _e < prevState.length; _e++) {
            console.log(`%c${_e} -> ${currentNode.title}`, "color:green");
            // Go through list and append any children
            for(let _a of action.val){
                console.dir(_a)
                console.log(`%c${_a.parentProject} =?= ${currentNode.id}`,"background-color: yellow")
                if(_a.parentProject == currentNode.id){
                    console.log("Parent Task Match")
                    // pushing on if current node is parent. 
                    currentNode.children.push = _a;
                    //@HERE -> We can run Task To Task
                    tasking(_a, action.val)
                }
            }
            currentNode = currentNode.next
        }
        console.log(prevState)
        return prevState;
    } else {
        return prevState;
    }
}

export const DevContextProvider = (props) => {
    const [projectData, setProjectData] = useState([]);
    const [taskData, setTaskData] = useState([]);
    const [runUpdate, setRunUpdate] = useState(0);
    //instantiate a LinkedList
    const [linkedList, dispatchLinkedList] = useReducer(updateLinkedList, new LinkedList())
    console.log('Running DevContextProvider')

    const callAPI = () => {
        setRunUpdate((runUpdate + 1) % 2)
    }

    //Check if user is already logged in
    useEffect(async () => {
        console.log('DevContextProvider useEffect')
        // Fetching PROJECTS
        const newProjects = await AuthActions.fetchAllProjects();
        console.log(`fetched -> ${newProjects}`)
        let newList = { type: "NEW_LIST", val: newProjects };
        dispatchLinkedList(newList);

        //Fetching TASKS
        const newData = await AuthActions.fetchAllData();
        let newTasks = { type: "NEW_TASKS", val: newData };
        dispatchLinkedList(newTasks);
    }, [runUpdate]);

    return (
        <DevContext.Provider value={{
            projectData: projectData,
            update: callAPI,
        }}>
            {props.children}
        </DevContext.Provider>
    )
}

export default DevContext;