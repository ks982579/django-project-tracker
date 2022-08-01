import React from "react";
import ReactDOM from "react-dom";

import styles from './PasswordChangeModal.module.scss';
import AuthActions from "../../../actions/auth-actions";
import CookieMonster from "../../CookieMonster";

// extracting portal method
const { createPortal } = ReactDOM;

// +++++++++++++++++++++++++++++++++++++++++++++++++++
// Backdrop
// +++++++++++++++++++++++++++++++++++++++++++++++++++
const Backdrop = props => {
    const scrollHandler = event => {
        event.stopPropagation();
    }
    return (
        <div
            className={styles.backdrop}
            onClick={props.onClick}
            onScroll={scrollHandler}></div>
    );
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++
// Overlay
// +++++++++++++++++++++++++++++++++++++++++++++++++++
const PasswordOverlay = props => {
    const onSubmitClick = event => {
        event.stopPropagation();
        event.preventDefault();
        console.log(event.target);
    }
    return (
        <div className={styles.overlay}>
            <form onSubmit={onSubmitClick}>
                <CookieMonster />
                <input type="password" placeholder="Old password..." name="oldPassword"/>
                <input type="password" placeholder="New password..." name="password1"/>
                <input type="password" placeholder="Retype New password..." name="password2"/>
                <input type="submit" value="Save" />
                <input type="button" value="Cancel" onClick={props.closeForm} />
            </form>
        </div>
    );
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++
// Password Change Modal
// +++++++++++++++++++++++++++++++++++++++++++++++++++
const PasswordChangeModal = props => {
    // This is function to set state to False and close Modal. 
    const cancelChange = props.toClose;

    return (
        <>
            <p>Messages Modal</p>
            {createPortal(
                <Backdrop onClick={cancelChange} />,
                document.getElementById('backdrop-root')
            )}
            {createPortal(
                <PasswordOverlay closeForm={cancelChange}/>,
                document.getElementById('modal-root')
            )}
        </>
    );
};

export default PasswordChangeModal;
// X --> <ProfileInfoForm />