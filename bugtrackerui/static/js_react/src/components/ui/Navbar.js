import React, {useContext} from "react";

import AuthContext from "../store/auth-context";

import styles from './Navbar.module.css';
import AuthActions from "../../actions/auth-actions";

const Navbar = (props) => {
    //Import context, whether user is or isn't logged in. 
    const ctx = useContext(AuthContext);

    //Logout click handler
    const logoutClickHandler = event => {
        AuthActions.logout();
        ctx.setLogin(false);
    }
    const profileClickHandler = event => {
        console.log('clicked "Profile"')
        props.onProfileClick();
    }

    return (
        <nav className={styles.navigation}>
            <div className={styles.padding}>--Project-Tracker--</div>
            <div className={`${styles.padding} ${styles.layout}`}>
                {!ctx.isLoggedIn && <div className={styles['div-buttons']} onClick={props.signupClick}>Sign-up</div>}
                {!ctx.isLoggedIn && <div className={styles['div-buttons']} onClick={props.loginClick}>Login</div>}
                {ctx.isLoggedIn && <div className={styles['div-buttons']} onClick={profileClickHandler}>Profile</div>}
                {ctx.isLoggedIn && <div className={styles['div-buttons']} onClick={logoutClickHandler}>Logout</div>}
            </div>
        </nav>
    );
}

export default Navbar;
// X --> <App>