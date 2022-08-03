import React, { useState, useContext } from "react";

// Import Context
import PostOffice from "../store/post-office";

// Import Components
import MessagesModal from "./MessagesModal";
import Card from "../ui/Card";

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
} // X --> <Mailbox>

const Mailbox = props => {
    // Importing Context
    const PostalContext = useContext(PostOffice);

    //Props
    const { onReplyClick } = props;

    const messagesListJSX = PostalContext.mailbox.map((contents) => {
        return (
            <Letter key={contents.key} content={contents} newMessage={onReplyClick}/>
        );
    })

    return (
        <>
            <p>hello world</p>
            {messagesListJSX}
        </>
    );
};

export default Mailbox;
// X --> <MessagesDashboard>