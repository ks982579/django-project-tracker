import React, {useContext, useEffect, useState} from "react";

import Card from "../ui/Card";
import ProjectCard from "./ProjectCard";

import {ProjectNode, TaskNode} from "../store/linked-list";

import AuthContext from "../store/auth-context";
import AuthActions from "../../actions/auth-actions";

// takes in 'onClick' and 'displayState' and 'onProjectClick'
const OwnershipCard = props => {
    const ctx = useContext(AuthContext)
    const [fullDisplay, setFullDisplay] = useState(false);
    const [projectsData, setProjectsData] = useState([])

    //setFullDisplay(props.displayState)

    useEffect(async ()=>{
        // TODO: Pull out the fetch()
        console.log("Fetching 'What I Own'")
        const jsobj = await AuthActions.fetchWhatIOwn();
        console.log(jsobj);
    },[])

    const manageClickHandler = (event) => {
        if(props.displayState){
            return
        } else {
            props.onClick(event)
        }
    }
    
    // Creating the ownership card array
    let ownershipCards = []
    //Don't map unless you have data to map too!
    if(props.displayState && projectsData.length > 0){
        ownershipCards = projectsData.map(data => {
            return <ProjectCard data={data} onClick={props.onProjectClick} />
        })
    }

    return (
        <Card>
            <h3 onClick={manageClickHandler}>Projects Under Management</h3>
            {ownershipCards.length > 0 ? ownershipCards : ''}
        </Card>
    )
};


export default OwnershipCard;
// --> <Dashboard/>