import React, {useState} from "react";

const ProfileEmailInput = (props) => {
    const labelText = props.children;
    const htmlName = props.name;
    const [emailValue, setEmailValue] = useState(props.val);
    const setEmailHandler = event => {
        setEmailValue(event.target.value);
    }

    return (
        <>
            <label htmlFor={htmlName}>{labelText}</label>
            <input type="email" id={htmlName} name={htmlName} value={emailValue} onChange={setEmailHandler}/>
        </>
    );
};

export default ProfileEmailInput;