import React, {useState} from "react";

import Card from "../ui/Card";
import AuthActions from "../../actions/auth-actions";
import CookieMonster from "../CookieMonster";

const CreateNewTask = () =>{
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
    const submitHandler = event => {
        event.preventDefault();
        console.log(AuthActions.createNewTask(event.target))

    }
    const stopIt = event => {
        event.stopPropagation();
    }
    const keyUps = event => {
        console.log(event)
        //event.code/key,keyCode,which
        //key: "Enter"
        //keyCode: 13
    }

    const formJSX  = (
        <form onSubmit={submitHandler} onClick={stopIt} onKeyUp={keyUps}>
            <input type='text' placeholder="Task Name..." name="taskName"/>
            <input type='submit' />
        </form>
    )

    return (
        <Card onClick={displayClickHandler}>
            <CookieMonster/>
            {!display && <h4>Create New Task +</h4>}
            {display && formJSX}
        </Card>
    )
}

export default CreateNewTask;