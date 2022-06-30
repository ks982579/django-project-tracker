import React, {useState, useContext} from "react";
import Card from "../ui/Card";
import {ProjectNode, TaskNode} from "../store/linked-list";
import TaskView from "./TaskView";
import AuthActions from "../../actions/auth-actions";

import DevContext from "../store/dev-context";
import styles from './TaskDetails.module.css';
import CookieMonster from "../CookieMonster";

/* Dumb Component for Details */
const DumbDetails = (props) => {
    return (
        <div className={styles['dumb-details']}>
            <sup>&lt;DumbDetails&gt;</sup><br/>
            <p>{props.node.description}</p>
            <TaskView parentTask={props.node.id} parentName={props.node.name}/>
        </div>
    )
}

const DumbForm = (props) => {
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
        // let thingy = event.target.form;
        // for(let _e in thingy){
        //     if(thingy[_e] != null){
        //         console.log(`${_e} -> ${thingy[_e]}`);
        //     }
        // }
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

    const submitFormHandler = event => {
        event.preventDefault();
    }

    //Formatting and making it pretty!
    //Might need to make Range into own component -> State changes a value as sliding up Complete
    // Could do Divs and a drag?
    return(
        <form onSubmit={submitFormHandler} onClick={stopProp}>
            <CookieMonster />
            <div className={styles['form-grid']}>
                <label htmlFor="name">Task Name:</label>
                <input id="name" name="name" type='text' value={node.name}/>
                <label htmlFor="description">Description:</label>
                <textarea id="description" spellCheck="true" name="description" value={node.description}/>
                <label htmlFor="endDate">End Date:</label>
                <input id="endDate" name="endDate" type="datetime-local" />
                <label htmlFor="percentComplete">Complete:</label>
                <input id="percentComplete" name="percentComplete" type="range" min="0" max="10000" value={`${node.percentComplete}`} />
            </div>
            <div>
                <input type="submit" />
                <input type="reset" />
                <button onClick={cancelClickHandler}>Cancel</button>
                <button onClick={deleteClickHandler}>Delete</button>
            </div>
        </form>
    )
}

//Takes in props.node = node (TaskNode)
/* {id, name, description, startDate, 
** endDate, percentComplete, parentProject, parentTask, developers}
*/
// Perhaps 'expansion' triggers form for updating?
const TaskDetails = (props) => {
    const [expansion, setExpansion] = useState(false);
    const [editState, setEditState] = useState(false);
    let node = props.node

    const clickHandler = () => {
        setExpansion(!expansion);
    }

    const editButtonHandler = event => {
        event.stopPropagation();
        setEditState((prevState)=>{
            if(prevState){
                return false;
            } else {
                return true;
            }
        })
    }

    return(
        <Card className={styles['task-details']} onClick={clickHandler}>
            <div className={styles.placard}>
                <div>
                    <sup>&lt;TaskDetails&gt;</sup><br/>
                    <b>{node.name}</b>
                    <p>{node.percentComplete/100}% complete</p>
                </div>
                <div>
                    <button onClick={editButtonHandler}>
                        Edit
                    </button>
                </div>
            </div>
            {editState && <DumbForm node={node} toggleForm={editButtonHandler} />}
            {expansion && <DumbDetails node={node} />}
        </Card>
    )
};

export default TaskDetails;
// X --> <TaskView>