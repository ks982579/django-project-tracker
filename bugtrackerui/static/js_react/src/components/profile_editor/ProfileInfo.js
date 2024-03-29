import React from "react";

import styles from './ProfileInfo.module.scss';

// props.userInfo = {id:,first_name:,last_name:,username:,email:}
const ProfileInfo = (props) => {
    console.log('I am <ProfileInfo>')
    const info = props.userInfo
    const firstName = info.first_name ? info.first_name : '';
    const lastName = info.last_name ? info.last_name : '';
    const username = info.username ? info.username : '';
    const email = info.email ? info.email : '';
    return (
        <div>
            <h3>Profile Info...</h3>
            <div className={styles['grid-container']}>
                <div>Username:</div>
                <div>{username}</div>
                <div>First Name:</div>
                <div>{firstName}</div>
                <div>Last Name:</div>
                <div>{lastName}</div>
                <div>E-mail:</div>
                <div>{email}</div>
                <div>Password:</div>
                <div>********</div>
            </div>
        </div>
    );
};

export default ProfileInfo;
// X --> <ProfileContainer>