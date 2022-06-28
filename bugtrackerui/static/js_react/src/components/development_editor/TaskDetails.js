import React, {useState} from "react";
import Card from "../ui/Card";
import LinkedList, {ProjectNode, TaskNode} from "../store/linked-list";
import TaskView from "./TaskView";

import styles from './TaskDetails.module.css';

/* Dumb Component for Details */
const DumbDetails = (props) => {
    return (
        <div className={styles['dumb-details']}>
            <sup>&lt;DumbDetails&gt;</sup><br/>
            <p>{props.node.description}</p>
            <TaskView parentTask={props.node.id} parentName={props.node.task_name}/>
        </div>
    )
}

const DumbForm = (props) => {

    const cancelClickHandler = event => {
        event.stopPropogation();
        props.toggleForm();
    }

    return(
        <form>
            <input name="name" type='text' value={props.node}/>
            <textarea spellCheck="true" name="description" />
            <input name="endDate" type="datetime-local" />
            <div>
                <input type="submit" />
                <input type="reset" />
                <button onClick={cancelClickHandler}>Cancel</button>
            </div>
        </form>
    )
}

//Takes in props.node = node (TaskNode)
/* {id, task_name, description, start_date, 
** end_date, percent_complete, parent_project, parent_task, developers}
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
                    <b>{node.task_name}</b>
                    <p>{node.percent_complete/100}% complete</p>
                </div>
                <div>
                    <button onClick={editButtonHandler}>
                        Edit
                    </button>
                </div>
            </div>
            {editState && <DumbForm toggleForm={editButtonHandler} />}
            {expansion && <DumbDetails node={props.node} />}
        </Card>
    )
};

export default TaskDetails;
// X --> <TaskView>