import React from "react";
import Card from "../ui/Card";

const MessagesNavbar = props => {
    const newMessageClick = props.onNewMessageClick;
    return (
        <Card>
            <small>&lt;MessagesNavbar&gt;</small>
            <div onClick={newMessageClick}>New Message</div>
            <input type="text" placeholder="Search..." />
        </Card>
    );
};

export default MessagesNavbar;
// X --> <MessagesDashboard>