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
const ReadOverlay = props => {
    /**
     * props.content = {date, from, to, cc, subject, body} -> the 'Mail' object
     */
    const mail = props.content;
    return (
        <div className={styles.overlay}>
            <p>from: {mail.from}</p>
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

const ReplyOverlay = props => {
    /**
     * props.content = {date, from, to, cc, subject, body} -> the 'Mail' object
     */
    const submitHandler = event => {
        event.preventDefault();
    }
    //I think CC will be some complicated logic, multiple to's.
    return (
        <div className={styles.overlay}>
            <form onSubmit={submitHandler}>
                <div>
                    <p>To: <input type="text" name="from" /></p>
                    <p>Subject: <input type="text" name="subject" /></p>
                </div>
                <div className={styles['body-container']}>
                    <textarea name="body" spellCheck="true" placeholder="Message..."></textarea>
                </div>
                <div className={styles['button-row']}>
                    <input type="submit" value="Send" />
                    <input type="button" value="Close" onClick={props.cancelClick} />
                </div>
            </form>
        </div>
    )
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++
// Message Modal
// +++++++++++++++++++++++++++++++++++++++++++++++++++
const MessagesModal = props => {
    const writeMode = props.writeMode ? true : false;
    const contacts = props.contacts; //User's teamMembers;

    const portaling = ((writeMode) => {
        console.log(`WriteMode: ${writeMode}`)
        if (writeMode) {
            return <ReplyOverlay cancelClick={props.overlayClick} />
        } else {
            return <ReadOverlay content={props.content} cancelClick={props.overlayClick} />
        }
    })(writeMode);

    return (
        <>
            <p>Messages Modal</p>
            {createPortal(
                <Backdrop onClick={props.overlayClick} />,
                document.getElementById('backdrop-root')
            )}
            {createPortal(
                portaling,
                document.getElementById('modal-root')
            )}
        </>
    );
};

export default MessagesModal;
// X --> <Letter> --> <MessagesDashboard>