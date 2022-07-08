import React, {useContext} from "react";
import ReactDOM from "react-dom";
import CookieMonster from "../../CookieMonster";

import Card from "../../ui/Card";

import AuthActions from "../../../actions/auth-actions";
import DevContext from "../../store/dev-context";

const NewProjectCont = () => {
    const devContext = useContext(DevContext);
    //Submit Handler
    const newProjectSubmitHandler = event => {
        event.preventDefault();

        const newProject = AuthActions.newProject(event.target);
        devContext.newProject(newProject);

        //There's no update for components?
    }

    return (
        <Card>
            <div>Hello from new projects.</div>
            <div>
                <form onSubmit={newProjectSubmitHandler}>
                    <CookieMonster/>
                    <div>
                        <input type="text" placeholder="Project Name" name="taskName" />
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
// X --> <Dashboard>