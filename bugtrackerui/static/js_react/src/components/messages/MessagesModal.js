import React from "react";
import ReactDOM from "react-dom";

import styles from './MessagesModal.module.scss';
import AuthActions from "../../actions/auth-actions";
import CookieMonster from "../CookieMonster";

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

    const replyHandler = event => {
        props.cancelClick(event);
        props.onReplyClick();
    }
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
                <input type="button" value="Reply" onClick={replyHandler} />
                <input type="button" value="Close" onClick={props.cancelClick} />
            </div>
        </div>
    )
}

const ReplyOverlay = props => {
    /**
     * props.content = {date, from, to, cc, subject, body} -> the 'Mail' object
     */
    const contacts = props.contacts;
    const submitHandler = event => {
        event.preventDefault();
        const resp = AuthActions.sendMessage(event.target);
        console.log(resp);
        props.cancelClick();
        
    }
    //I think CC will be some complicated logic, multiple to's.
    // perhaps the comma ',' could be listened for to determine if something should be stored.
    return (
        <div className={styles.overlay}>
            <form onSubmit={submitHandler}>
                <CookieMonster />
                <div>
                    <datalist id="contacts">
                        {contacts.map((choice) => <option key={choice.id} value={choice.username}/>)}
                    </datalist>
                    <p>To: <input type="text" name="sendTo" list="contacts"/></p>
                    <p>Subject: <input type="text" name="subject" autoComplete="off"/></p>
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
/**
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#list
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist#specifications
 */

// +++++++++++++++++++++++++++++++++++++++++++++++++++
// Message Modal
// +++++++++++++++++++++++++++++++++++++++++++++++++++
const MessagesModal = props => {
    const writeMode = props.writeMode ? true : false;
    const contacts = props.contacts; //User's teamMembers;
    const newMessage = props.newMessage; //function to set state of new message to True

    const switchToWriteMode = () => {
        
    }

    const portaling = ((writeMode) => {
        console.log(`WriteMode: ${writeMode}`)
        if (writeMode) {
            return <ReplyOverlay cancelClick={props.overlayClick} contacts={contacts}/>
        } else {
            return <ReadOverlay content={props.content} cancelClick={props.overlayClick} onReplyClick={newMessage}/>
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