import React, {useContext} from "react";
import CookieMonster from "../CookieMonster";

import AuthActions from "../../actions/auth-actions";
import styles from "./SignupForm.module.css";
import AuthContext from "../store/auth-context";

const SignupForm = props => {
    // Import Context
    const authContext = useContext(AuthContext);

    const submitHandler = async (event) => {
        event.preventDefault();
        //Check Passwords - Not doing it RN
        const _response = await AuthActions.signupHandler(event.target);
        console.log(JSON.stringify(_response));
        if(!_response.error){
            console.log('Status 201 - nice!')
            authContext.setLogin(true);
            props.cancelClick();
        } else {
            console.log(_response)
        }
    }

    return (
        <div className={styles['signup-cont']}>
            <div className={styles['signup-align']}>
                <p>Signup here</p>
                <form className={styles['the-form']} onSubmit={submitHandler}>
                    <CookieMonster/>
                    <input name="username" type='text' placeholder='User Name...' />
                    <input name="email" type='email' placeholder='Email...' />
                    <input name="password1" type='password' placeholder='Password...' />
                    <input name="password2" type='password' placeholder='Confirm Password...' />
                    <div className={styles["buttons-cont"]}>
                        <input type='submit' value='Sign Up!' />
                        <input type='reset' value="Clear Form" />
                        <input type='button' value='Cancel' onClick={props.cancelClick} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
// X --> <App>