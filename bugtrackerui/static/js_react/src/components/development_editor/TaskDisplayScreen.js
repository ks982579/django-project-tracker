import React from "react";

import TaskView from "./TaskView";
import Card from "../ui/Card";
/* 
* Get project Information 
* Display Tasks to project
*/

// takes in props.selected = project object
//[id, title, sub_title, start_date, end_date, percent_complete, owner, developers]
const TaskDisplayScreen = (props) => {
    let returnedJSX = [];
    if(props.selected){
        for(let _e in props.selected){
            returnedJSX.push(<p>{_e} --> {props.selected[_e]}</p>)
        }
    }
    return (
        <Card>
            <sup>&gt;TaskDisplayScreen&lt;</sup>
            {returnedJSX}
            <TaskView parentProject={props.selected.id} parentName={props.selected.title}/>
        </Card>
    )
}

export default TaskDisplayScreen;
// --> <Dashboard>