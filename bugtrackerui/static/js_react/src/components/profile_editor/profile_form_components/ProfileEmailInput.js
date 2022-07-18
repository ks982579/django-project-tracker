import React from "react";

const ProfileEmailInput = (props) => {
    const labelText = props.children;
    const htmlName = props.name;
    return (
        <>
            <label htmlFor={htmlName}>{labelText}</label>
            <input type="email" id={htmlName} name={htmlName} value={props.val}/>
        </>
    );
};

export default ProfileEmailInput;