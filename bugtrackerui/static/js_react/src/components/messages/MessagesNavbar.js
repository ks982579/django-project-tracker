import React from "react";
import Card from "../ui/Card";

const MessagesNavbar = props => {
    return (
        <Card>
            <small>&lt;MessagesNavbar&gt;</small>
            <div>New Message</div>
            <input type="text" placeholder="Search..." />
        </Card>
    );
};

export default MessagesNavbar;