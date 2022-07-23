import React, { useState, useEffect } from "react";

import AuthActions from "../../actions/auth-actions";
import Card from "../ui/Card";

class Mail {
    constructor(pyObj){
        this.key = pyObj.id;
        this.date = pyObj.sent_date;
        this.from = pyObj.from_user;
        this.to = pyObj.send_to; // should be me
        this.cc = pyObj.cc_to;
        this.subject = pyObj.subject;
        this.body = pyObj.body;
    }
    static create(pyObj){
        return new Mail(pyObj);
    }
}

const Letter = (props) =>{
    return (
        <Card>
            <h3>Letter</h3>
            <p>{props.content.from}</p>
            <p>{props.content.date}</p>
            <p>{props.content.subject}</p>
        </Card>
    )
}

const MessagesDashboard = props => {
    const [userMail, setUserMail] = useState([]);

    useEffect(() => {
        let isSubscribed = true;
        (async () => {
            if (isSubscribed) {
                const inbox = await AuthActions.fetchMessages();
                if (Array.isArray(inbox)) {
                    let _ary = [];
                    for(let _em of inbox){
                        _ary.push(Mail.create(_em));
                    }
                    setUserMail(_ary);
                } else {
                    console.warn(`Messages not array - Type = {${typeof inbox}}`);
                }
            } else {
                console.log('Not Subscribed');
            }
        })();
        return (() => isSubscribed = false);
    }, [])

    let mailbox = []

    for(let _em of userMail){
        mailbox.push(<Letter key={_em.key} content={_em}/>);
    }

    return (
        <div>
            <p>Messages Dashboard</p>
            {mailbox}
        </div>
    );
};

export default MessagesDashboard;