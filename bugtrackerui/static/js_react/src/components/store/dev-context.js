import React, { useState, useEffect, useReducer, cloneElement } from "react";

import AuthActions from "../../actions/auth-actions";

const DevContext = React.createContext({
    projectData: [],
    setTopLevel: {},
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


/* Missed the Mark */
// Takes in an updated prevState.
// gpid is the top level parent id 
const calcPC = (prevState, gpid) => {
    
    // children should be ARRAY of children nodes
    const helper = (parent) => {
        let calcRes = [];
        // If parent has children, we cannot directly calculate
        // Must pass children into helper...
        if(parent.children && parent.children.length > 0){
            for(let _efk of parent.children){
                // I think this will reference Object location in memory
                calcRes.push(helper(_efk));
            }
        } else {
            calcRes.push(parent.percent_complete);
        }
        let mean = 0;
        for(let _x of calcRes){
            mean += _x;
        }
        mean /= calcRes.length;
        // Set Parents %Comp
        // pythonic syntax :(
        parent.percent_complete = Math.floor(mean);

        // Floor so no task will accidently appear 100% complete
        return mean;
    };
    // find the starting point. 
    for(let _efp of prevState){
        if(_efp.id != gpid){
            continue;
        } else {
            helper(_efp); // no reason to catch any returned value
        }
    }
    // Changes should be applied to memory
    return prevState;
}

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
    const [selectedProject, setSelectedProject] = useState(false);
    const [runUpdate, setRunUpdate] = useState(0);
    
    // Context Start Now!!!
    console.log('Running DevContextProvider')
    // non State Storage

    const setTopLevel = (parentID) => {
        console.log(`%cRUNNING setTopLevel()`, "color:red;font-weight:800;font-size:18px;")
        setSelectedProject(parentID);
    }

    const callAPI = async () => {
        console.log(`%cCalling API...`, "background-color: black; color: red;")
        //setRunUpdate((runUpdate + 1) % 2)
        const newProjects = await AuthActions.fetchAllProjects();
        console.log('projects fetched');
        setTaskData(newProjects);
        console.log('Projects Stored');
        return true;
    }

    //Check if user is already logged in
    useEffect(async () => {
        console.log('DevContextProvider useEffect')
        // Fetching PROJECTS
        const newProjects = await AuthActions.fetchAllProjects();
        console.log(`fetching Projects -> ${newProjects}`)
        // This is calculating PC... hopefully we can remove from here
        calcPC(newProjects, selectedProject);
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
            // Update all Percentage Complete. 
            calcPC(stateCopy, selectedProject);
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
        setTaskData((prevState) => {
            //Making a Copy of state
            let copyState = deepCopy(prevState);

            // Get task -> Pointer to Memory Location?
            const foundTask = findTask(rawData.id, copyState);

            // Reassign values :) - preserves memory location
            for(let _y in foundTask){
                if(_y == "id" || _y == "children"){
                    continue;
                } else if(_y == "end_date"){
                    let endDate = new Date(rawData[_y]);
                    foundTask[_y] = endDate.toISOString();
                } else {
                    foundTask[_y] = rawData[_y];
                }
            }

            //updates percentages 
            copyState = calcPC(copyState, selectedProject);

            //Return updated state
            return copyState;
        })
    }

    const deleteTaskHandler = (deleteID, parentID = null) => {
        setTaskData((prevState) => {
            let copyState = deepCopy(prevState);
            if(parentID === null){
                // Exclude the state - Garbage collection should delete it
                return copyState.filter(task => task.id != deleteID);
            } else {
                // find parent
                const foundRent = findTask(parentID, copyState);
                const indexToDel = foundRent.children.findIndex(_efk => _efk.id === deleteID);

                // splice out the child (Using delete leaves 'null')
                // and .slice does not modify array.
                foundRent.children.splice(indexToDel, 1);

                //updates percentages 
                copyState = calcPC(copyState, selectedProject);

                return copyState;
            }
        })
    }


    //May want to change 'value' to be State / reducer?

    return (
        <DevContext.Provider value={{
            projectData: taskData, // --> <DeveloperCard>
            setTopLevel: setTopLevel,
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