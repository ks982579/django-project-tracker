import React, { useState, useContext } from "react";
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
            <sup>&lt;DumbDetails&gt;</sup><br />
            <pre>{props.data.description}</pre>
            <TaskView parentID={props.data.id} kids={props.data.children} whichProject={props.whichProject}/>
        </div>
    )
}


/* {id, name, description, startDate, 
** endDate, percentComplete, parentProject, parentTask, developers}
*/
// Perhaps 'expansion' triggers form for updating?
const TaskDetails = (props) => {
    console.log(`%cInit <TaskDetails> ID: ${props.data.id}`, "background-color: lightpink; color: whitesmoke;")
    const [expansion, setExpansion] = useState(props.init === true ? true : false);
    const [editState, setEditState] = useState(false);
    let { id, 'task_name': taskName, description, 'start_date': startDate, 'end_date': endDate, 'percent_complete': percentComplete } = props.data;

    // Fixing endDate
    if (endDate == null) {
        endDate = 'TBA';
    } else {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
        //console.log(endDate);
        endDate = new Date(endDate);
        //console.log(endDate)
        // default locale = []

        const _time = endDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

        let _date = endDate.toLocaleDateString([], {
            year: 'numeric',
            month: '2-digit',
            day:'2-digit'
        })

        endDate = `${_date} @ ${_time}`;
    }

    const clickHandler = () => {
        setExpansion(!expansion);
    }

    const editButtonHandler = event => {
        event.stopPropagation();
        setEditState((prevState) => {
            if (prevState) {
                return false;
            } else {
                return true;
            }
        })
    }

    return (
        <Card className={styles['task-details']} onClick={clickHandler}>
            <div className={styles.placard}>
                <div className={styles.placard}>
                    <div>
                        <sup>&lt;TaskDetails&gt;</sup><br />
                        <b>{taskName}</b>
                        <p>{percentComplete / 100}% complete</p>
                    </div>
                    <div>
                        <p>Start: {startDate}</p>
                        <p>Due: {endDate}</p>
                    </div>
                </div>
                <div>
                    <button onClick={editButtonHandler}>
                        Edit
                    </button>
                </div>
            </div>
            {editState && <TaskEditorForm data={props.data} toggleForm={editButtonHandler} whichProject={props.whichProject}/>}
            {expansion && <DumbDetails data={props.data} whichProject={props.whichProject}/>}
        </Card>
    )
};

export default TaskDetails;
// X --> <TaskView>