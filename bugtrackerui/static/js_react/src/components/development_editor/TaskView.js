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
    let parentID = props.parentID;
    let idCheck;
    let returnedJSX= []

    try{
        for(let _efk of props.kids){
            console.log(JSON.stringify(_efk))
            returnedJSX.push(<TaskDetails data={_efk}/>)
        }
    } catch(error) {
        console.warn(error);
    }

    const createTaskHandler = () => {
        console.log('Accidently Deleted this....')
    }

    return (
        <Card className={styles['the-view']}>
            <sup>&lt;TaskView&gt;</sup><br/>
            <b>Tasks...</b>
            {returnedJSX}
            <CreateNewTask parent={parentID} saveNewTask={createTaskHandler} />
        </Card>
    )
};

export default TaskView;
// X --> <TaskDisplayScreen>
// X --> <TaskDetails>