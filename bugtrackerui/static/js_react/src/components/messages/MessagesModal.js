import React from "react";
import ReactDOM from "react-dom";

import styles from './MessagesModal.module.scss';

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
const Overlay = props => {
    /**
     * props.content = {date, from, to, cc, subject, body} -> the 'Mail' object
     */
    const mail = props.content;
    return (
        <div className={styles.overlay}>
            <p>from: mail.from</p>
            <h3>Subject: {mail.subject}</h3>
            <small>sent: {mail.date}</small>
            <div>
                <pre>
                    {mail.body}
                </pre>
            </div>
            <div className={styles['button-row']}>
                <input type="button" value="Reply" onClick={props.cancelClick} />
                <input type="button" value="Close" onClick={props.cancelClick} />
            </div>
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
                <Backdrop onClick={props.overlayClick} />,
                document.getElementById('backdrop-root')
            )}
            {createPortal(
                <Overlay content={props.content} cancelClick={props.overlayClick} />,
                document.getElementById('modal-root')
            )}
        </>
    );
};

export default MessagesModal;
// X --> <Letter> --> <MessagesDashboard>