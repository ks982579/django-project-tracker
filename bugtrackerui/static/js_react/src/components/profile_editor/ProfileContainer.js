import React, { useEffect, useState } from "react";

import AuthActions from "../../actions/auth-actions";
import Card from "../ui/Card";
import ProfileInfo from "./ProfileInfo";
import ProfileInfoForm from "./ProfileInfoForm";

import styles from './ProfileContainer.module.css';

// If the container is rendered, let's call information from the API
// {id:,first_name:,last_name:,username:,email:}
const ProfileContainer = (props) => {
    console.log(`<ProfileContainer> = ${props.bool}`);
    console.log('<ProfileContainer> 1')
    const [userInfo, setUserInfo] = useState('');
    console.log('<ProfileContainer> 1.5')
    const [editInfo, setEditInfo] = useState(false);

    console.log('<ProfileContainer> 2')
    useEffect(async () => {
        // Get user data from API
        let apiResponse = await AuthActions.getUserData();
        console.log(`%c${JSON.stringify(apiResponse)}`, "color:grey;")
        setUserInfo(apiResponse);
    }, []);

    console.log('<ProfileContainer> 3')
    const editInfoHandler = (event) => {
        event.stopPropagation();
        if(!editInfo){
            setEditInfo(true);
        }
    }

    console.log('<ProfileContainer> 4')
    const closeFormHandler = (event) => {
        if(editInfo){
            setEditInfo(false);
        }
    }

    console.log('<ProfileContainer> 5')
    return (
        <Card>
            <div className={styles["title-container"]}>
                <h2>User Profile</h2>
                <button onClick={editInfoHandler}>Edit Details</button>
            </div>
            {!editInfo && <ProfileInfo userInfo={userInfo} />}
            {editInfo && <ProfileInfoForm userInfo={userInfo} setUserInfo={setUserInfo} toggleForm={closeFormHandler}/>}
        </Card>
    )
}

export default ProfileContainer;
// X --> <Dashboard>