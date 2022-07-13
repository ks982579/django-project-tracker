import React, {useContext} from "react";

import CookieMonster from "../../CookieMonster";
import DevContext from "../../store/dev-context";
import AuthActions from "../../../actions/auth-actions";

import styles from "../TaskDetails.module.css";
import InputElm from "./InputElm";
import RangeElm from "./RangeElm";
import TextAreaElm from "./TextAreaElm";
import DatetimeElm from "./DatetimeElm";

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
    let {id, 'task_name': taskName, description, 'start_date':startDate, 'end_date':endDate, 'percent_complete':percentComplete, 'parent_task':parentID } = props.data;
    const devContext = useContext(DevContext);

    /**
     * Any update to creat children will cause DevContext to update.
     * That causes components to rerender,
     * and this expression will (should) update. 
    */ 
   // Not on Delete!
    let showPC = props.data.children ? false : true;
    
    const stopProp = event => {
        event.stopPropagation();
    }

    const cancelClickHandler = event => {
        stopProp(event);
        event.preventDefault();
        props.toggleForm(event);
    }

    const deleteClickHandler = async (event) => {
        stopProp(event);
        event.preventDefault();
        // id is scoped to component (not cleanest)
        const response = await AuthActions.deleteTask(id, event.target.form);
        console.log(JSON.stringify(response));
        if(response==204){
            //204 = No Content; sent back if everything is OK!
            try{
                devContext.deleteTask(id, parentID);
                props.whichProject(false);
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
        let response = await AuthActions.updateTask(id, event.target);

        //Update Context -> Causes a reRender
        devContext.updateTask(response);

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
                <InputElm elmID="name" elmType="text" elmVal={taskName}>Task Name:</InputElm>
                <TextAreaElm elmID="description" elmVal={description}>Description:</TextAreaElm>
                <DatetimeElm elmID="endDate" elmVal={endDate}>End Date:</DatetimeElm>
                {showPC && <RangeElm elmID="percentComplete" elmVal={percentComplete}>Complete:</RangeElm>}
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