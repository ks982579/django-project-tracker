import React from "react";

// Import Components
import CookieMonster from "../CookieMonster";

// Import Styling
import styles from './TeamMembersNavBar.module.scss';

// Importing helpers
import AuthActions from "../../actions/auth-actions";


const TeamMembersNavBar = props => {

    /**
     * TODO: control <input/> component. 
     * @param {HTML} event 
     */

    const onMemberRequest = event => {
        event.stopPropagation();
        event.preventDefault();
        console.log("Searching for Frie-... Team Member");
        /**
         * Search for team member. 
         * if they exist, send them a message.
         * if not, show an error {sticky/fixed}
         * Maybe animate coming up from the bottom, and sinking back down. 
         */
        (async (rawFormData) => {
            console.log('passing info to helper')
            // passing form data into helper function to call API
            const jsonRes = await AuthActions.addTeamMember(rawFormData);
            console.log(jsonRes);
        })(event.target);

    };

    return(
        <nav className={styles["navbar-container"]}>
            <div>Team Member Navbar</div>
            <form onSubmit={onMemberRequest}>
                <CookieMonster />
                <input type="text" name="memberRequest" placeholder="Search..." />
                <input type="submit" value="Send Request"/>
            </form>
        </nav>
    );
};

export default TeamMembersNavBar;