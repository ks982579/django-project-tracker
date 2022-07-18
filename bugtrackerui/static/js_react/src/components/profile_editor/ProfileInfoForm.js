import React from "react";
import CookieMonster from "../CookieMonster";

import styles from './ProfileInfo.module.css';
import ProfileEmailInput from "./profile_form_components/ProfileEmailInput";
import ProfileTextInput from "./profile_form_components/ProfileTextInput";

// props.userInfo = {id:,first_name:,last_name:,username:,email:}
const ProfileInfoForm = (props) => {
    console.log('I am <ProfileInfoForm>')
    const info = props.userInfo
    const firstName = info.first_name ? info.first_name : '';
    const lastName = info.last_name ? info.last_name : '';
    const username = info.username ? info.username : '';
    const email = info.email ? info.email : '';

    const formSubmitHandler = (event) => {
        event.preventDefault();
        console.log(event.target)
    }

    return (
        <div>
            <h3>Profile Info...</h3>
            <form onSubmit={formSubmitHandler}>
                <div className={styles['grid-container']}>
                    <CookieMonster/>
                    <ProfileTextInput name="username" val={username}>Username:</ProfileTextInput>
                    <ProfileTextInput name="firstName" val={firstName}>First Name:</ProfileTextInput>
                    <ProfileTextInput name="lastName" val={lastName}>Last Name:</ProfileTextInput>
                    <ProfileEmailInput name="email" val={email}>E-mail:</ProfileEmailInput>
                </div>
                <input type="submit" value="Save"/>
            </form>
        </div>
    );
};

export default ProfileInfoForm;
// X --> <ProfileContainer>