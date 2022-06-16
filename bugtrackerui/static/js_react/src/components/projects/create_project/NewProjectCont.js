import React from "react";
import ReactDOM from "react-dom";
import CookieMonster from "../../CookieMonster";

import Card from "../../ui/Card";

import AuthActions from "../../../actions/auth-actions";

const NewProjectCont = () => {
    //Submit Handler
    const newProjectSubmitHandler = event => {
        event.preventDefault();

        //create FormData object
        const data = new FormData(event.target)
        const dataObj = {
            title: data.get('title'),
            sub_title: data.get('sub_title'),
        }
        const jsonObj = JSON.stringify(dataObj)
        const csrfToken = data.get('csrftoken');
        console.log(jsonObj) // the Form
        console.log(`CSRF Token: ${csrfToken}`)
        AuthActions.newProject(jsonObj, csrfToken);
    }

    return (
        <Card>
            <div>Hello from new projects.</div>
            <div>
                <form onSubmit={newProjectSubmitHandler}>
                    <CookieMonster/>
                    <div>
                        <input type="text" placeholder="Title" name="title" />
                    </div>
                    <div>
                        <input type="text" placeholder="Sub-Title" name="sub_title" />
                    </div>
                    <div>
                        <input type="submit" value='Submit' />
                    </div>
                </form>
            </div>
        </Card>
    )
}

export default NewProjectCont;