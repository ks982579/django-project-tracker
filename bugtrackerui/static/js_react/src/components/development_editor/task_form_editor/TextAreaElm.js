import React, {useState} from "react";

const varDump = event => {
    const format = {
        "background-color": "black",
        color: "white",
    }
    for(let _e in event){
        console.log(`%c${_e} --> ${event[_e]}`, format)
    }
}

const TextAreaElm = props => {
    const elmID = props.elmID;
    //Type is preSet
    const [elmVal, setElmVal] = useState(props.elmVal);

    //https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
    const inputListener = event => {
        setElmVal(prevState =>{
            return event.target.value;
        })
    }

    return (
        <>
            <label htmlFor={elmID}>{props.children}</label>
            <textarea id={elmID} spellCheck="true" name={elmID} value={elmVal} onInput={inputListener}/>
        </>
    )
};

export default TextAreaElm;