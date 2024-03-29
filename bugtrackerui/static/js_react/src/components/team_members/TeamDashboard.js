import React, { useState, useEffect } from "react";
import AuthActions from "../../actions/auth-actions";

// Import components
import Card from "../ui/Card";
import TeamMembersNavBar from "./TeamMembersNavBar";
import Members from "./member_components/Members";

// Get Sassy
import sassy from './TeamDashboard.module.scss';

/**
 * Generic reusable team member component
 * Thinking of having 3 objects with similar properties.
 * Could create a class and throw it in helpers
 * Should we be able to see if a request was rejected? 
 */

const TeamDashboard = () => {
    const [members, setMembers] = useState({});

    useEffect(() => {
        (async () => {
            const apiResponse = await AuthActions.fetchTeamMembers();
            // {requested_by, requesting, team}
            setMembers(apiResponse);
        })();
    }, []);

    let membersList = [];
    let requestedBy = [];
    let requesting = [];
    console.log('About to run through members');
    console.log(`${JSON.stringify(members)}`);
    console.log(`Members length = ${Object.keys(members).length}`);
    
    // Check if data has been obtained yet
    if(Object.keys(members).length > 0){
        for (let _efk of members.team) {
            console.log(_efk.username)
            membersList.push(
                <Card className={sassy['membership-card']}>
                    {_efk.username}
                    <input type='button' name='delete' value='Delete?'/>
                </Card>
            );
        };
    };

    const requestedByJSX = (
        <Card>
            <h3>Requests Received</h3>
            {requestedBy}
        </Card>
    );
    const requestingJSX = (
        <Card>
            <h3>Requests Sent</h3>
            {requesting}
        </Card>
    );
    const membersListJSX = (
        <Card>
            <h3>Current Team Members</h3>
            {membersList}
        </Card>
    );

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