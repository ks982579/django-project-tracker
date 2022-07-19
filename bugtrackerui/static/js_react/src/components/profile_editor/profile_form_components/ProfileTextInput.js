import React, {useState} from "react";

const ProfileTextInput = (props) => {
    const labelText = props.children;
    const htmlName = props.name;
    const [inputVal, setInputVal] = useState(props.val)
    const inputChangeHandler = (event) => {
        setInputVal(event.target.value);
    }
    return (
        <>
            <label htmlFor={htmlName}>{labelText}</label>
            <input type="text" id={htmlName} name={htmlName} value={inputVal} onChange={inputChangeHandler}/>
        </>
    );
};

export default ProfileTextInput;