import React, {useState} from "react";
import Card from "../ui/Card";
import LinkedList, {ProjectNode, TaskNode} from "../store/linked-list";
import TaskView from "./TaskView";

//Takes in props.node = node
// Perhaps 'expansion' triggers form for updating?
const TaskDetails = (props) => {
    const [expansion, setExpansion] = useState(false);

    const clickHandler = () => {
        setExpansion(!expansion);
    }
    return(
        <Card onClick={clickHandler}>
            <p>{props.node.name}</p>
            {expansion && <p>{props.node.description}</p>}
            {expansion && <TaskView parentTask={props.node.id}/>}
        </Card>
    )
};

export default TaskDetails;