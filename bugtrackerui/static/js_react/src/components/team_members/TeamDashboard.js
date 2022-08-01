import React, { useState, useEffect } from "react";
import AuthActions from "../../actions/auth-actions";

import Card from "../ui/Card";

const TeamDashboard = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        (async () => {
            const apiResponse = await AuthActions.fetchTeamMembers();
            setMembers(apiResponse);
        })();
    }, []);

    let membersList = []
    for(let _efk of members){
        console.log(_efk.username)
        membersList.push(<Card>{_efk.username}</Card>)
    }

    return (
        <div>
            <ul>
                <li>friend request</li>
                <ul>
                    <li>Show active team members</li>
                    <li>Search for a team member</li>
                    <li>CRUD team - kind of</li>
                    <li>Send Messages?</li>
                </ul>
            </ul>
            {membersList}
        </div>
    )
};

export default TeamDashboard;