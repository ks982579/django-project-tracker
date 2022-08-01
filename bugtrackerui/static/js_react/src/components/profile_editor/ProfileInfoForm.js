import React, {useState} from "react";
import AuthActions from "../../actions/auth-actions";
import CookieMonster from "../CookieMonster";
import PasswordChangeModal from "./password_change_modal/PasswordChangeModal";

import styles from './ProfileInfo.module.scss';
import ProfileEmailInput from "./profile_form_components/ProfileEmailInput";
import ProfilePasswordChange from "./profile_form_components/ProfilePasswordChange";
import ProfileTextInput from "./profile_form_components/ProfileTextInput";

// props.userInfo = {id:,first_name:,last_name:,username:,email:}
const ProfileInfoForm = (props) => {
    console.log('I am <ProfileInfoForm>')
    const info = props.userInfo
    const firstName = info.first_name ? info.first_name : '';
    const lastName = info.last_name ? info.last_name : '';
    const username = info.username ? info.username : '';
    const email = info.email ? info.email : '';

    const [passwordState, setPasswordState] = useState(false);
    const showPasswordChangeForm = () => {
        setPasswordState(true);
    }
    const closePasswordChangeForm = () => {
        setPasswordState(false);
    }

    //If this is successful, we should switch screens
    const formSubmitHandler = async (event) => {
        event.preventDefault();
        console.log(event.target);
        //Sending Form
        const apiResp = await AuthActions.sendUserUpdate(event.target);
        console.log(JSON.stringify(apiResp));
        props.setUserInfo(apiResp);
        props.toggleForm();
    }

    return (
        <div>
            <h3>Profile Info...</h3>
            {passwordState && <PasswordChangeModal toClose={closePasswordChangeForm}/>}
            <form onSubmit={formSubmitHandler} className={styles.form}>
                <div className={styles['grid-container']}>
                    <CookieMonster />
                    <ProfileTextInput name="username" val={username}>Username:</ProfileTextInput>
                    <ProfileTextInput name="firstName" val={firstName}>First Name:</ProfileTextInput>
                    <ProfileTextInput name="lastName" val={lastName}>Last Name:</ProfileTextInput>
                    <ProfileEmailInput name="email" val={email}>E-mail:</ProfileEmailInput>
                    <ProfilePasswordChange onClick={showPasswordChangeForm}/>
                </div>
                <div className={styles.buttons}>
                    <input type="submit" value="Save" />
                    <input type="button" value="Cancel" onClick={props.toggleForm} />
                </div>
            </form>
        </div>
    );
};

export default ProfileInfoForm;
// X --> <ProfileContainer>