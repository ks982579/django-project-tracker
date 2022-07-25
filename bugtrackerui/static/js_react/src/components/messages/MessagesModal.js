import React from "react";
import ReactDOM from "react-dom";

import styles from './MessagesModal.module.scss';

const {createPortal} = ReactDOM;

// +++++++++++++++++++++++++++++++++++++++++++++++++++
// Backdrop
// +++++++++++++++++++++++++++++++++++++++++++++++++++
const Backdrop = props => {
    return (
        <div className={styles.backdrop}></div>
    );
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++
// Overlay
// +++++++++++++++++++++++++++++++++++++++++++++++++++
const Overlay = props => {
    return (
        <div>
            <h3>Subject line</h3>
            <p>This is like the body of the paragraph.</p>
            <input type="button" value="Click Me!" />
        </div>
    )
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++
// Message Modal
// +++++++++++++++++++++++++++++++++++++++++++++++++++
const MessagesModal = props => {
    return (
        <>
            <p>Messages Modal</p>
            {createPortal(
                <Backdrop />,
                document.getElementById('backdrop-root')
            )}
            {createPortal(
                <Overlay />,
                document.getElementById('modal-root')
            )}
        </>
    );
};

export default MessagesModal;