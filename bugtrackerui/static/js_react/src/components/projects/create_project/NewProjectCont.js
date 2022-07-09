import React, {useContext} from "react";
import ReactDOM from "react-dom";
import CookieMonster from "../../CookieMonster";

import Card from "../../ui/Card";

import AuthActions from "../../../actions/auth-actions";
import DevContext from "../../store/dev-context";

const NewProjectCont = (props) => {
    const devContext = useContext(DevContext);
    //Submit Handler
    const newProjectSubmitHandler = async (event) => {
        event.preventDefault();

        // console.log(`%c`, loggy)
        let loggy = "color: blue; background-color: azure; border: solid black 1px;"
        
        console.log(`%cSending New Project Data`, loggy)
        console.log(`%c${event.target}`, loggy)
        const newProject = await AuthActions.newProject(event.target);
        console.log(`%cResponse...`, loggy)
        console.log(`%c${JSON.stringify(newProject)}`, loggy)

        devContext.newProject(newProject);
        //There's no update for components?
        props.setDisplay();
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