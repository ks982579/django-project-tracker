import React from "react";

const ProfileTextInput = (props) => {
    const labelText = props.children;
    const htmlName = props.name;
    return (
        <>
            <label htmlFor={htmlName}>{labelText}</label>
            <input type="text" id={htmlName} name={htmlName} value={props.val}/>
        </>
    );
};

export default ProfileTextInput;