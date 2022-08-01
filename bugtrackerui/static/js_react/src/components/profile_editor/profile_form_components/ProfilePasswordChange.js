import React, {useState} from "react";

const ProfilePasswordChange = (props) => {

    const onClickHandler = event => {
        event.stopPropagation();
        console.log('Hello World')
        // Sets state to show the form. 
        props.onClick();
    }

    return (
        <>
            <p>Password: </p>
            <input type="button" value="Change..." onClick={onClickHandler}/>
        </>
    );
};

export default ProfilePasswordChange;