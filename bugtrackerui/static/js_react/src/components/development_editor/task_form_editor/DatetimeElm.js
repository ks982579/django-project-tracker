import React, { useState } from "react";

const varDump = event => {
    const format = {
        "background-color": "black",
        color: "white",
    }
    for (let _e in event) {
        console.log(`%c${_e} --> ${event[_e]}`, format)
    }
}

//Create to Isolate a problem with preset values for element...
const DatetimeElm = props => {
    /**
     * props.elmVal is end/due date string from Python |OR| null
     * It is not in the correct format and has been throwing off the elements preset value...
     */
    const elmID = props.elmID;

    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local
    console.log("<DatetimeElm/>");

    let stringDate = "";
    // If the value is not null and is a string length greater than nothing...
    if (props.elmVal != null && props.elmVal.length > 0) {
        // create Date Object
        const endDate = new Date(props.elmVal);
        // Get into nearly correct format
        stringDate = endDate.toISOString();

        // Pop off the Z if it's there. It has been throwing off the preset...
        if (stringDate.endsWith("Z")) {
            /**
             * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr
             * String.substr() is Deprecated...
             * For these purposes, String.substring() is near identical solution. 
             */
            stringDate = stringDate.substring(0, stringDate.length - 1);
            console.log(stringDate);
        }
    } else {
        stringDate = null; 
    }

    const [elmVal, setElmVal] = useState(stringDate);

    //https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
    const inputListener = event => {
        setElmVal(prevState => {
            return event.target.value;
        })
        console.log(event.target.value);
    }

    return (
        <>
            <label htmlFor={elmID}>{props.children}</label>
            <input id={elmID} name={elmID} type="datetime-local" value={elmVal} onInput={inputListener} />
        </>
    )
};

export default DatetimeElm;