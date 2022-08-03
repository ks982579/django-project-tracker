import React, { useState, useEffect } from "react";

import AuthActions from "../../actions/auth-actions";
import Card from "../ui/Card";
import MessagesModal from "./MessagesModal";
import MessagesNavbar from "./MessagesNavbar";
import Mailbox from "./Mailbox";

// Context
import PostOffice, { DeliveryPerson } from "../store/post-office";

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

const Letter = (props) => {
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
            {displayLetter && <MessagesModal overlayClick={overlayClickHandler} content={props.content} newMessage={props.newMessage} />}
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

    useEffect(() => {
        (async () => {
            const members = await AuthActions.fetchTeamMembers();
            console.log(members)
            setTeamMembers(members);
        })();
    }, []);

    const createNewMessage = (event) => {
        setNewMessage(true);
    }
    const cancelCreateMessage = event => {
        setNewMessage(false);
    }

    let lilStyle = {
        fontWeight: 800,
        border: "2px dashed red",
    }

    return (
        <Card>
            <p style={lilStyle}>&lt;Messages Dashboard/&gt;</p>
            <DeliveryPerson>
                <MessagesNavbar onNewMessageClick={createNewMessage} />
                <Mailbox onReplyClick={createNewMessage}/>
            </DeliveryPerson>
            {newMessage && <MessagesModal writeMode={newMessage} overlayClick={cancelCreateMessage} contacts={teamMembers} />}
        </Card>
    );
};

export default MessagesDashboard;
// X --> <Dashboard>