import React, { useContext, useReducer } from "react";

import LinkedList, { ProjectNode, TaskNode } from "../store/linked-list";
import DevContext from "../store/dev-context";
import Card from "../ui/Card";
import TaskDetails from "./TaskDetails";
import CreateNewTask from "./CreateNewTask";

// action = {type, data}
const linkedListReducer = (prevState, action) => {
    console.log(`In LLR -> ${JSON.stringify(action)}`)
    if(action.type == "PUSH"){
        console.log(`LL.length => ${prevState.length}`)
        // https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
        let clone = structuredClone(prevState);
        clone.push = new TaskNode(action.data);
        console.log(`LL.length => ${clone.length}`)
        return clone;
    }
}

//props.parentProject = {id};
//props.parentName = str
const TaskView = (props) => {
    const devctx = useContext(DevContext);
    // for creating new tasks, must have parent
    let parentID = {};

    const initReducer = props => {
        console.log(props)
        let taskList = new LinkedList(); //{head: null, length: 0}

        if (props.parentProject) {
            // Project cycles through pushing on New Tasks...
            console.log(devctx.taskData);
            parentID = { parentProject: props.parentProject };
            for (let _efk of devctx.taskData) {
                console.log(`%cProject (${props.parentProject}) =?= task (${_efk['parent_project']})`, "color:blue")
                if (_efk['parent_project'] == props.parentProject) {
                    taskList.push = new TaskNode(_efk);
                }
            }
        }
        if (props.parentTask) {
            // Project cycles through pushing on New Tasks...
            console.log(devctx.taskData);
            parentID = { parentTask: props.parentTask };
            for (let _efk of devctx.taskData) {
                if (_efk['parent_task'] == props.parentTask) {
                    taskList.push = new TaskNode(_efk);
                }
            }
        }
        return taskList;
    }

    // going to try passing in props...
    const [taskList, dispatchTaskList] = useReducer(linkedListReducer, props, initReducer)

    let returnedJSX = [];
    let currentNode = taskList.head;
    //while currentNode != null ?
    for (let _lb = 0; _lb < taskList.length; _lb++) {
        console.log(`node -> ${currentNode}`)
        returnedJSX.push(<TaskDetails node={currentNode} />)
        currentNode = currentNode.next;
    }

    const createTaskHandler = (jsonObj) => {
        let action = {
            type: "PUSH",
            data: jsonObj,
        };
        console.log(JSON.stringify(action));
        dispatchTaskList(action);
    }

    return (
        <Card>
            <b>{props.parentName} Tasks...</b>
            {returnedJSX}
            <CreateNewTask parent={parentID} saveNewTask={createTaskHandler}/>
        </Card>
    )
};

export default TaskView;
// X --> <TaskDisplayScreen>
// X --> <TaskDetails>