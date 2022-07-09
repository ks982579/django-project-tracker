import React, { useState, useEffect, useReducer, cloneElement } from "react";

import AuthActions from "../../actions/auth-actions";

const DevContext = React.createContext({
    projectData: [],
    update: {},
    newProject: {},
    newTask: {},
    updateTask: {},
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

// Will return Pointer to correct Object
const findTask = (taskID, taskTree) => {
    if(Array.isArray(taskTree)){
        for(let _efk of taskTree){
            // if this kid is correct, return it
            if(_efk.id === taskID){
                return _efk;
            // else, if kid has kids, check them
            } else if(_efk.children != null && _efk.children != undefined){
                // Pass in the children to search -> Array
                let _x = findTask(taskID, _efk.children)
                if(_x !== null){
                    return _x;
                }
            // Else, move to next in list
            } else {
                continue;
            }
        }
    } else {
        if(taskTree.id === taskID){
            return taskTree;
        }
    }
    // If no kids were picked, return null
    return null;
}

function deepCopy(objectToCopy){
    return JSON.parse(JSON.stringify(objectToCopy));
}

export const DevContextProvider = (props) => {
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
        setTaskData(newProjects);
        console.log('Projects Stored');
    }, [runUpdate]);

    const newProjectHandler = (newProjectData) => {
        console.log("New Project Handler at work")
        setTaskData((prevState)=>{
            // Copy
            const stateCopy = deepCopy(prevState)
            
            //Perhaps Sorting by due date later...
            stateCopy.push(newProjectData);

            return stateCopy;
        });
    }

    // Works as of 2022.07.08
    const newTaskHandler = (newTaskObj) => {
        setTaskData((prevState) => {
            // Copy state via JSON - Other methods created errors
            const jsonCopy = JSON.stringify(prevState);
            const stateCopy = JSON.parse(jsonCopy);
            
            //Get correct task in copied state. 
            const foundTask = findTask(newTaskObj.parent_task, stateCopy);
            
            if(foundTask){
                if(foundTask.children){
                    foundTask.children.push(newTaskObj);
                } else {
                    // If first child, we create a new list for children
                    foundTask.children = [newTaskObj];
                }
            }
            // Return updated Copied State!
            return stateCopy;
        });
    }

    const updateTaskHandler = rawData => {
        /**
         * The API has updated the data in the backend
         * and provided a response.
         * Now just replace the data here. 
         */
        console.log("RAWDATA");
        console.log(JSON.stringify(rawData));
        setTaskData((prevState) => {
            //Making a Copy of state
            let copyState = deepCopy(prevState);

            // Get task -> Pointer to Memory Location?
            const foundTask = findTask(rawData.id, copyState);

            // Reassign values :) - preserves memory location
            for(let _y in foundTask){
                if(_y == "id" || _y == "children"){
                    continue;
                } else {
                    foundTask[_y] = rawData[_y];
                }
            }

            //Return updated state
            return copyState;
        })
    }

    const deleteTaskHandler = (deleteID, parentID = null) => {
        console.log(`%cInit Deletion of ${deleteID}`,"background-color: yellow; color: firebrick;")
        setTaskData((prevState) => {
            const copyState = deepCopy(prevState);
            if(parentID === null){
                // Exclude the state - Garbage collection should delete it
                return copyState.filter(task => task.id != deleteID);
            } else {
                // find parent
                const foundRent = findTask(parentID, copyState);
                const indexToDel = foundRent.children.findIndex(_efk => _efk.id === deleteID);
                // Delete the child
                delete foundRent.children[indexToDel];
                return copyState;
            }
        })
    }


    //May want to change 'value' to be State / reducer?

    return (
        <DevContext.Provider value={{
            projectData: taskData, // --> <DeveloperCard>
            update: callAPI,
            newProject: newProjectHandler,
            newTask: newTaskHandler,
            updateTask: updateTaskHandler,
            deleteTask: deleteTaskHandler,
        }}>
            {props.children}
        </DevContext.Provider>
    )
}

export default DevContext;