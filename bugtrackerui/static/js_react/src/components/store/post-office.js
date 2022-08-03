import React, {useEffect, useState, useReducer} from "react";

import AuthActions from "../../actions/auth-actions";

/**
 * Hoping this clever name doesn't confuse me in the future.
 * This will hold messages, or mail, and possibly leave open
 * the option for a Socket connection. 
 */

// Objects for storage
 class Mail {
    constructor(pyObj) {
        this.key = pyObj.id;
        this.date = pyObj.sent_date;
        this.from = pyObj.from_user;
        this.to = pyObj.send_to; // should be me
        this.cc = pyObj.cc_to;
        this.subject = pyObj.subject;
        this.body = pyObj.body;
    }
    static create(pyObj) {
        return new Mail(pyObj);
    }
}

// This is default export
const PostOffice = React.createContext({
    mailbox: [],
});

export const DeliveryPerson = props => {

    const [mailbox, fillMailbox] = useState([]);

    useEffect(()=>{
        let isSubscribed = true;
        (async () => {
            if(isSubscribed){
                // Get messages from API -> list
                const inbox = await AuthActions.fetchMessages();
                // if we get an array, turn them into Mail object
                // vvv Make part of Mail class vvv
                if(Array.isArray(inbox)){
                    let _list = []
                    for(let _em of inbox) {
                        _list.push(Mail.create(_em));
                    }
                    // Filling Mailbox
                    fillMailbox(_list);
                } else {
                    console.warn(`Messages not array - Type = {${typeof inbox}}`);
                };
                // ^^^ Make part of Mail Class ^^^
            } else {
                console.warn("Not Subscribed");
            }
        })();
        // Clean-up function
        return (()=>{isSubscribed = false});
    },[]);

    const contents = {
        mailbox: mailbox,
    }
    return (
        <PostOffice.Provider value={contents}>
            {props.children}
        </PostOffice.Provider>
    );
};





// default Export Here
export default PostOffice