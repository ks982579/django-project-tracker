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

const RangeElm = props => {
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
            <label htmlFor={elmID}>{props.children} ({elmVal/100}%)</label>
            <input id={elmID} name={elmID} type="range" value={elmVal} onInput={inputListener} min="0" max="10000" />
        </>
    )
};

export default RangeElm;