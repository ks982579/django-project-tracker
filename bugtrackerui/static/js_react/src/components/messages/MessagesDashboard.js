import React, { useState, useEffect } from "react";

import AuthActions from "../../actions/auth-actions";
import Card from "../ui/Card";
import MessagesModal from "./MessagesModal";
import MessagesNavbar from "./MessagesNavbar";

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
    const [displayLetter, setDisplayLetter] = useState(false);
    const letterClickHandler = (event, data) => {
        setDisplayLetter(true);
    }
    const overlayClickHandler = (event) => {
        event.stopPropagation();
        setDisplayLetter(false);
    }

    return (
        <Card onClick={letterClickHandler} data={props.content}>
            {displayLetter && <MessagesModal overlayClick={overlayClickHandler} content={props.content}/>}
            <h3>Letter</h3>
            <p>{props.content.from}</p>
            <p>{props.content.date}</p>
            <p>{props.content.subject}</p>
        </Card>
    )
}

const MessagesDashboard = props => {
    const [userMail, setUserMail] = useState([]);
    const [newMessage, setNewMessage] = useState(false);
    const [teamMembers, setTeamMembers] = useState([])

    useEffect(()=>{
        (async()=>{
            const members = await AuthActions.fetchTeamMembers();
            console.log(members)
            setTeamMembers(members);
        })();
    },[]);

    const createNewMessage = (event) => {
        setNewMessage(true);
    }
    const cancelCreateMessage = event => {
        setNewMessage(false);
    }

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

    let lilStyle = {
        fontWeight: 800,
        border: "2px dashed red",
    }

    return (
        <Card>
            <p style={lilStyle}>&lt;Messages Dashboard/&gt;</p>
            <MessagesNavbar onNewMessageClick={createNewMessage}/>
            {mailbox}
            {newMessage && <MessagesModal writeMode={newMessage} overlayClick={cancelCreateMessage} contacts={teamMembers}/>}
        </Card>
    );
};

export default MessagesDashboard;
// X --> <Dashboard>