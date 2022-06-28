import React, { useContext, useState, useReducer } from "react";

import DevContext from "../store/dev-context";
import Card from "../ui/Card";
import TaskDetails from "./TaskDetails";
import CreateNewTask from "./CreateNewTask";

import styles from './TaskView.module.css';


//props.parentProject = {id};
//props.parentName = str
const TaskView = (props) => {
    const devContext = useContext(DevContext);
    // for creating new tasks, must have parent
    let parentID;
    let idCheck;
    let returnedJSX= []

    //Setting ID variables for component
    if(props.parentProject){
        parentID = {parentProject: props.parentProject};
        idCheck = parentID.parentProject;
        for(let _efk of devContext.taskData){
            if(idCheck == _efk['parent_project']){
                returnedJSX.push(<TaskDetails node={_efk}/>);
            }
        }
    } else if(props.parentTask) {
        parentID = {parentTask: props.parentTask};
        idCheck = parentID.parentTask;
        for(let _efk of devContext.taskData){
            if(idCheck == _efk['parent_task']){
                returnedJSX.push(<TaskDetails node={_efk}/>);
            }
        }
    } else {
        console.error(`<TaskView> received no parent information`);
    }

    //For ReRenders, logic at bottom
    const [parentState, setParentState] = useState(idCheck);

    const createTaskHandler = (jsonObj) => {
        devContext.newTask(jsonObj);
        //Should cause rerender!
    }

    /* if the Parent ID changes, we need to create a new
    ** Linked List from DevContext.
    */
    if(idCheck != parentState) {
        setParentState(idCheck);
    }

    return (
        <Card className={styles['the-view']}>
            <sup>&lt;TaskView&gt;</sup><br/>
            <b>{props.parentName} Tasks...</b>
            {returnedJSX}
            <CreateNewTask parent={parentID} saveNewTask={createTaskHandler} />
        </Card>
    )
};

export default TaskView;
// X --> <TaskDisplayScreen>
// X --> <TaskDetails>