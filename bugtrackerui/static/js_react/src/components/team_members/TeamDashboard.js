import React, { useState, useEffect } from "react";
import AuthActions from "../../actions/auth-actions";

// Import components
import Card from "../ui/Card";
import TeamMembersNavBar from "./TeamMembersNavBar";

const TeamDashboard = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        (async () => {
            const apiResponse = await AuthActions.fetchTeamMembers();
            setMembers(apiResponse);
        })();
    }, []);

    let membersList = []
    for (let _efk of members) {
        console.log(_efk.username)
        membersList.push(<Card>{_efk.username}</Card>)
    }

    return (
        <div>
            <TeamMembersNavBar></TeamMembersNavBar>
            <ul>
                <li>friend request</li>
                <ul>
                    <li>Show active team members</li>
                    <li>Search for a team member</li>
                    <li>CRUD team - kind of</li>
                    <li>Send Messages?</li>
                </ul>
            </ul>
            <div>
                <h3>Current Team Members</h3>
                {membersList}
            </div>
        </div>
    )
};

export default TeamDashboard;