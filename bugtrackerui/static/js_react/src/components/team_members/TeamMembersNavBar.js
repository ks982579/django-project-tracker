import React from "react";

//Import Styling
import styles from './TeamMembersNavBar.module.scss';

const TeamMembersNavBar = props => {

    /**
     * TODO: control <input/> component. 
     * @param {HTML} event 
     */

    const onMemberRequest = event => {
        event.stopPropagation();
        event.preventDefault();
        console.log("Searching for Frie-... Team Member")
    }
    return(
        <nav className={styles["navbar-container"]}>
            <div>Team Member Navbar</div>
            <form onSubmit={onMemberRequest}>
                <input type="text" name="memberRequest" placeholder="Search..." />
                <input type="submit" value="Send Request"/>
            </form>
        </nav>
    );
};

export default TeamMembersNavBar;