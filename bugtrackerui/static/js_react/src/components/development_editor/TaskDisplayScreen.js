import React, {useContext} from "react";

import TaskView from "./TaskView";
import Card from "../ui/Card";
import TaskDetails from "./TaskDetails";
import DevContext from "../store/dev-context";
/* 
* Get project Information 
* Display Tasks to project
*/

// takes in props.selected = project NOde object
//[id, title, subTitle, startDate, endDate, percentComplete, owner, developers[]]
// props.whichProject sets state in Dashboard for particular case
const TaskDisplayScreen = (props) => {
    //Need to push components to render with changes
    const devContext = useContext(DevContext);
    // Returns an Array, but should only have ONE value!
    devContext.setTopLevel(props.selected.id);
    const properData = devContext.projectData.filter(datum =>{
        return datum.id === props.selected.id;
    });

    //console.log(`%c${JSON.stringify(properData)}`,"color:red");

    return (
        <Card>
            <sup>&lt;TaskDisplayScreen&gt;</sup><br/>
            <TaskDetails data={properData[0]} init={true} whichProject={props.whichProject} />
        </Card>
    )
}

export default TaskDisplayScreen;
// --> <Dashboard>