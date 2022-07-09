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

const DatetimeElm = props => {
    const elmID = props.elmID;

    console.log("<DatetimeElm/>");
    console.log(typeof props.elmVal.toISOString());
    let stringDate = props.elmVal.toISOString();

    if(stringDate.endsWith("Z")){
        stringDate = stringDate.substr(0, stringDate.length-1);
        console.log(stringDate);
    }

    const [elmVal, setElmVal] = useState(stringDate);

    //https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
    const inputListener = event => {
        setElmVal(prevState =>{
            return event.target.value;
        })
        console.log(event.target.value);
    }
    console.log(typeof elmVal);

    return (
        <>
            <label htmlFor={elmID}>{props.children}</label>
            <input id={elmID} name={elmID} type="datetime-local" value={stringDate} onInput={inputListener}/>
        </>
    )
};

export default DatetimeElm;