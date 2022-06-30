import React from "react";

import TaskView from "./TaskView";
import Card from "../ui/Card";
/* 
* Get project Information 
* Display Tasks to project
*/

// takes in props.selected = project NOde object
//[id, title, subTitle, startDate, endDate, percentComplete, owner, developers[]]
const TaskDisplayScreen = (props) => {
    let returnedJSX = (
        <>
            <p>props.selected.title</p>
            <p>props.selected.subTitle</p>
        </>
    )
    return (
        <Card>
            <sup>&lt;TaskDisplayScreen&gt;</sup><br/>
            {returnedJSX}
            <TaskView parentProject={props.selected.id} parentName={props.selected.title} />
        </Card>
    )
}

export default TaskDisplayScreen;
// --> <Dashboard>