import React, {useState} from "react";

import Card from "../ui/Card";
import AuthActions from "../../actions/auth-actions";
import CookieMonster from "../CookieMonster";

// --> <TaskView> 
// props.parentID = {parentProject/parentTask: int}
// props.saveNewTask = Fn(jsonObj)
const CreateNewTask = (props) =>{
    const [display, setDisplay] = useState(false);

    const displayClickHandler = (event) => {
        setDisplay(prevState => {
            if(prevState){
                return false;
            } else {
                return true;
            }
        });
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(`%cSubmitting... ${props.parent}`, 'color: red');
        let newData = await AuthActions.createNewTask(event.target, props.parent)
        //If no error
        if(!newData.error){
            console.log(`Trying to Save Data`);
            props.saveNewTask(newData);
        } else {
            console.log(newData.error);
        }
    }

    const stopIt = event => {
        event.stopPropagation();
    }
    const keyUps = event => {
        //console.log(event)
        //event.code/key,keyCode,which
        //key: "Enter"
        //keyCode: 13
    }

    const formJSX  = (
        <form onSubmit={submitHandler} onClick={stopIt} onKeyUp={keyUps}>
            <CookieMonster/>
            <input type='text' placeholder="Task Name..." name="taskName"/>
            <textarea name="description"
                placeholder="Description..."
                rows="5" cols="10"
                autoCorrect="off"
                spellCheck="true" />
            <input type='submit' />
        </form>
    )

    return (
        <Card onClick={displayClickHandler}>
            {!display && <p>Create New Task +</p>}
            {display && formJSX}
        </Card>
    )
}

export default CreateNewTask;
// --> <TaskView>