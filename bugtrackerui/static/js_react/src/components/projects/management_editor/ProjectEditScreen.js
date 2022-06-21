import React, {useState, useContext} from "react";

import Card from "../../ui/Card";

import DevContext from "../../store/dev-context";

const ProjectEditScreen = (props) => {
    const devctx = useContext(DevContext);
    console.log(`The Project Data -> ${devctx.projectData}`)

    let data = devctx.projectData;

    let jsxlist = []
    let dataObj = {}
    console.warn(data.length)
    if(data.length){
        for(let _efk=0; _efk < data.length; _efk++){
            if(_efk == 0){
                dataObj = data.head;
            } else {
                dataObj = dataObj.next;
            }
            jsxlist.push(<p key={_efk}>{dataObj.title}</p>)
            console.log(`Title -> ${dataObj.title}`)
        }
    }
    return (
        <Card>
            {jsxlist}
            <h3>This is Project Edit Screen</h3>
            <p>Edit Project Title</p>
            <p>Edit Project Sub-Title</p>
            <p>Edit Project Title</p>
            <p>Add/Remove Developers?</p>
            <p>Delete</p>
        </Card>
    )
}

export default ProjectEditScreen;