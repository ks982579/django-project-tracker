import React, {useState} from "react";
import Card from "../ui/Card";
import LinkedList, {ProjectNode, TaskNode} from "../store/linked-list";
import TaskView from "./TaskView";

//Takes in props.node = node (TaskNode)
// [id, developers, parentProject,parentTask,name,description,startDate,endDate,percentComplete]
// Perhaps 'expansion' triggers form for updating?
const TaskDetails = (props) => {
    const [expansion, setExpansion] = useState(false);

    const clickHandler = () => {
        setExpansion(!expansion);
    }
    return(
        <Card onClick={clickHandler}>
            <b>{props.node.name}</b>
            <p>{props.node.percentComplete/100}% complete</p>
            {expansion && <p>{props.node.description}</p>}
            {expansion && <TaskView parentTask={props.node.id} parentName={props.node.name}/>}
        </Card>
    )
};

export default TaskDetails;
// X --> <TaskView>