import React, {useState, useContext} from "react";

import Card from "../../ui/Card";

import DevContext from "../../store/dev-context";

//props.selected = project object
const ProjectEditScreen = (props) => {
    let returnJSX = []
    if(props.selected){
        for(let _e in props.selected){
            returnJSX.push(<p>{_e} --> {props.selected[_e]}</p>);
        }
    }
    return (
        <Card>
            {returnJSX}
        </Card>
    )
}

export default ProjectEditScreen;
// --> <Dashboard>