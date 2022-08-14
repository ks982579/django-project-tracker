import React, { useContext } from "react";
import CookieMonster from "../CookieMonster";

//Get Context
import AuthContext from "../store/auth-context";
import AuthActions from "../../actions/auth-actions";
import DevContext from "../store/dev-context";

// CSS Styles
import styles from "./SignupForm.module.css";

const printout = (mssg) => {
    const myfont = "background-color: LimeGreen; color: thistle;";
    console.log(`%c${mssg}`, myfont);
}

const LoginForm = (props) => {
    // Getting Context
    const ctx = useContext(AuthContext);
    const devCtx = useContext(DevContext);

    const {forgotPassword} = props //This sets this form up

    const submitHandler = async (event) => {
        event.preventDefault()
        printout("<LoginForm> submitHandler")
        // Send request to login
        const json_data = await AuthActions.login(event.target); //waits for this data
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
        <div className={styles['signup-cont']}>
            <div className={styles['signup-align']}>
                <p>Login Here!</p>
                <form className={styles['the-form']} onSubmit={submitHandler}>
                    <CookieMonster />
                    <input name="username" type='text' placeholder="Username..." />
                    <input name="password" type='password' placeholder="Password..." />
                    <div className={styles['buttons-cont']}>
                        <input type='submit' value='Login' />
                        <input type='button' value='Cancel' onClick={props.cancelClick} />
                    </div>
                    <input type="button" value="Forgot Password" onClick={forgotPassword}/>
                </form>
            </div>
        </div>
    )
};

export default LoginForm;