import React, { useContext } from "react";
import CookieMonster from "../CookieMonster";

//Get Context
import AuthContext from "../store/auth-context";
import AuthActions from "../../actions/auth-actions";
import DevContext from "../store/dev-context";

const printout = (mssg) => {
    const myfont = "background-color: LimeGreen; color: thistle;";
    console.log(`%c${mssg}`, myfont);
}

const LoginForm = (props) => {
    // Getting Context
    const ctx = useContext(AuthContext);
    const devCtx = useContext(DevContext);

    const submitHandler = async (event) => {
        event.preventDefault()
        printout("<LoginForm> submitHandler")
        // Send request to login
        const json_data = await AuthActions.login(event.target.children); //waits for this data
        printout("Data acquired");
        printout(JSON.stringify(json_data));
        if (json_data != null && json_data.login == 'successful') {
            console.log("setting Context 'isLoggedIn'...")
            await devCtx.update();
            ctx.setLogin(true);
        }
        return json_data;
    }

    return (
        <div style={{ 'border': '2px solid black' }}>
            <h3>Login</h3>
            <form onSubmit={submitHandler}>
                <CookieMonster />
                <input type='text' placeholder="Username..." />
                <br />
                <input type='password' placeholder="Password..." />
                <br />
                <input type='submit' value='Login' />
                <input type='button' value='Cancel' onClick={props.cancelClick} />
            </form>

        </div>
    )
};

export default LoginForm;