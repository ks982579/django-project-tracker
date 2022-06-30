import React, {useState, useContext} from "react";
import Card from "../ui/Card";
import {ProjectNode, TaskNode} from "../store/linked-list";
import TaskView from "./TaskView";
import AuthActions from "../../actions/auth-actions";
import TaskEditorForm from "./task_form_editor/TaskEditorForm";

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
            {editState && <TaskEditorForm node={node} toggleForm={editButtonHandler} />}
            {expansion && <DumbDetails node={node} />}
        </Card>
    )
};

export default TaskDetails;
// X --> <TaskView>