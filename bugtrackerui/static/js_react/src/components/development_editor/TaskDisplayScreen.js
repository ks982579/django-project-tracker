import React from "react";

import TaskView from "./TaskView";
import Card from "../ui/Card";
import TaskDetails from "./TaskDetails";
/* 
* Get project Information 
* Display Tasks to project
*/

// takes in props.selected = project NOde object
//[id, title, subTitle, startDate, endDate, percentComplete, owner, developers[]]
const TaskDisplayScreen = (props) => {
    return (
        <Card>
            <sup>&lt;TaskDisplayScreen&gt;</sup><br/>
            <TaskDetails data={props.selected} init={true}/>
        </Card>
    )
}

export default TaskDisplayScreen;
// --> <Dashboard>