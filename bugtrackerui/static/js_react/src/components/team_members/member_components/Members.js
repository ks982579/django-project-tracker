import React from "react";

// import Sassy styles
import sassy from './Members.module.scss';

/**
 * Think like factory. Depending on inputs, change state and alter (slightly) output
 * and functionality. 
 */

const BaseMember = (props) => {
    const manual = 'This is common functionality between all, probably a dumb component.';
    const {username} = props.user;
    return (
        <>
            <div className={sassy['profile-img']}>photo</div>
            <p>{username}</p>
        </>
    );
}

const MembersSynced = () => {
    return 0;
}
const MembersRequestedBy = () => {
    return 0;
}
const MembersRequesting = () => {
    return 0;
}


// DEFAULT EXPORT
const Members = (props) => {
    /**
     * If you get 'props.team' -> MembersSynced
     * If you get 'props.requested_by' -> MembersRequestedBy
     * If you get 'props.requesting' -> MembersRequesting
     */
    return 0;
};

export default Members;