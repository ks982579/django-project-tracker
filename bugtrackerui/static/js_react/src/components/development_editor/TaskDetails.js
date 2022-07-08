import React, {useState, useContext} from "react";
import Card from "../ui/Card";
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
            <p>{props.data.description}</p>
            <TaskView parentID={props.data.id} kids={props.data.children}/>
        </div>
    )
}


/* {id, name, description, startDate, 
** endDate, percentComplete, parentProject, parentTask, developers}
*/
// Perhaps 'expansion' triggers form for updating?
const TaskDetails = (props) => {
    const [expansion, setExpansion] = useState(props.init === true ? true : false);
    const [editState, setEditState] = useState(false);
    let {id, 'task_name': taskName, description, 'start_date':startDate, 'end_date':endDate, 'percent_complete':percentComplete } = props.data;

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
                    <b>{taskName}</b>
                    <p>{percentComplete/100}% complete</p>
                </div>
                <div>
                    <button onClick={editButtonHandler}>
                        Edit
                    </button>
                </div>
            </div>
            {editState && <TaskEditorForm data={props.data} toggleForm={editButtonHandler} />}
            {expansion && <DumbDetails data={props.data} />}
        </Card>
    )
};

export default TaskDetails;
// X --> <TaskView>