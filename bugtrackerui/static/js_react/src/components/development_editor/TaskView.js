import React, {useContext, useReducer} from "react";

import LinkedList, {ProjectNode, TaskNode} from "../store/linked-list";
import DevContext from "../store/dev-context";
import Card from "../ui/Card";
import TaskDetails from "./TaskDetails";
import CreateNewTask from "./CreateNewTask";

//props.parentProject = {id};
const TaskView = (props) => {
    const devctx = useContext(DevContext);
    //const [ taskList, dispatchTaskList ] = useReducer(linkedListReducer, new LinkedList())
    let taskList = new LinkedList(); //{head: null, length: 0}
    let returnedJSX = [];
    if(props.parentProject){
        // Project cycles through pushing on New Tasks...
        console.log(devctx.taskData);
        for(let _efk of devctx.taskData){
            console.log(`%cProject (${props.parentProject}) =?= task (${_efk['parent_project']})`, "color:blue")
            if(_efk['parent_project']==props.parentProject){
                taskList.push = new TaskNode(_efk);
            }
        }
    }

    if(props.parentTask){
        // Project cycles through pushing on New Tasks...
        console.log(devctx.taskData);
        for(let _efk of devctx.taskData){
            if(_efk['parent_task']==props.parentTask){
                taskList.push = new TaskNode(_efk);
            }
        }
    }

    let currentNode = taskList.head;
    //while currentNode != null ?
    for(let _lb = 0; _lb < taskList.length; _lb++){
        console.log(`node -> ${currentNode}`)
        returnedJSX.push(<TaskDetails node={currentNode} />)
        currentNode = currentNode.next;
    }

    return (
        <Card>
            <h3>Task View</h3>
            {returnedJSX}
            <CreateNewTask/>
        </Card>
    )
};

export default TaskView;