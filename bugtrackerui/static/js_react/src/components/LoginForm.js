import React, {useContext} from "react";
import CookieMonster from "./CookieMonster";

//Get Context
import AuthContext from "./store/auth-context";
import AuthActions from "../actions/auth-actions";
import DevContext from "./store/dev-context";

const LoginForm = (props) => {
    // Getting Context
    const ctx = useContext(AuthContext);
    const devCtx = useContext(DevContext)

    const submitHandler = (event) => {
        event.preventDefault()
        
        // Send request to login
        const jsonRes = async () => {
            const json_data = await AuthActions.login(event.target.children); //waits for this data
            if(json_data != null && json_data.login == 'successful'){
                console.log("setting Context 'isLoggedIn'...")
                ctx.setLogin(true);
                devCtx.update();
            }
            return json_data
        }
        console.log(jsonRes())
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