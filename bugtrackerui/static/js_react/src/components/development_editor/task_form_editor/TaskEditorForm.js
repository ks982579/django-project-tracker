import React, {useContext} from "react";

import CookieMonster from "../../CookieMonster";
import DevContext from "../../store/dev-context";
import AuthActions from "../../../actions/auth-actions";

import styles from "../TaskDetails.module.css";
import InputElm from "./InputElm";
import RangeElm from "./RangeElm";
import TextAreaElm from "./TextAreaElm";
import { TaskNode } from "../../store/linked-list";

const varDump = event => {
    const format = {
        "background-color": "black",
        color: "white",
    }
    for(let _e in event){
        console.log(`%c${_e} --> ${event[_e]}`, format)
    }
}

const TaskEditorForm = (props) => {
    let node = props.node;
    const devContext = useContext(DevContext);

    const stopProp = event => {
        event.stopPropagation();
    }

    const cancelClickHandler = event => {
        stopProp(event);
        event.preventDefault();
        props.toggleForm(event);
    }

    const deleteClickHandler = async event => {
        stopProp(event);
        event.preventDefault();
        const response = await AuthActions.deleteTask(node.id, event.target.form);
        if(response==204){
            //204 = No Content; sent back if everything is OK!
            try{
                devContext.deleteTask(node.id);
            } catch(error){
                console.error(`Unable to delete Tasks - Frontend error: ${error}`)    
            }
        } else {
            console.error(`Unable to delete Tasks - Backend error: ${response}`)
        }
        //Then we remove from React Storage
        props.toggleForm(event);
    }

    const submitFormHandler = async event => {
        event.preventDefault();

        //Fetching complete JSON Object from Server
        let response = await AuthActions.updateTask(node.id, event.target);

        //Transform back into Task Node
        const updatedTask = TaskNode.create(response);

        //Update Context -> Causes a reRender
        devContext.updateTask(updatedTask);

        //Close Editor
        props.toggleForm(event);
    }

    //Formatting and making it pretty!
    //Might need to make Range into own component -> State changes a value as sliding up Complete
    // Could do Divs and a drag?
    return(
        <form onSubmit={submitFormHandler} onClick={stopProp}>
            <CookieMonster />
            <div className={styles['form-grid']}>
                <InputElm elmID="name" elmType="text" elmVal={node.name}>Task Name:</InputElm>
                <TextAreaElm elmID="description" elmVal={node.description}>Description:</TextAreaElm>
                <InputElm elmID="endDate" elmType="datetime-local" elmVal={node.endDate}>End Date:</InputElm>
                <RangeElm elmID="percentComplete" elmVal={node.percentComplete}>Complete:</RangeElm>
            </div>
            <div>
                <input type="submit" />
                <button onClick={cancelClickHandler}>Cancel</button>
                <button onClick={deleteClickHandler}>Delete</button>
            </div>
        </form>
    )
}

export default TaskEditorForm;
// X --> <TaskDetails>