import React, {useState} from "react";
import Card from "../ui/Card";
import LinkedList, {ProjectNode, TaskNode} from "../store/linked-list";
import TaskView from "./TaskView";

//Takes in props.node = node (TaskNode)
/* {id, task_name, description, start_date, 
** end_date, percent_complete, parent_project, parent_task, developers}
*/
// Perhaps 'expansion' triggers form for updating?
const TaskDetails = (props) => {
    const [expansion, setExpansion] = useState(false);
    let node = props.node

    const clickHandler = () => {
        setExpansion(!expansion);
    }
    return(
        <Card onClick={clickHandler}>
            <sup>&lt;TaskDetails&gt;</sup>
            <b>{node.task_name}</b>
            <p>{node.percent_complete/100}% complete</p>
            {expansion && <p>{node.description}</p>}
            {expansion && <TaskView parentTask={node.id} parentName={node.task_name}/>}
        </Card>
    )
};

export default TaskDetails;
// X --> <TaskView>