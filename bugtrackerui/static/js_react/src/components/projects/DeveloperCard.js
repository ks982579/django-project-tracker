import React, {useContext, useEffect, useState} from "react";

import Card from "../ui/Card";
import ProjectCard from "./ProjectCard";

import AuthContext from "../store/auth-context";
import DevContext from "../store/dev-context";

// takes in 'onClick' and 'displayState' and 'onProjectClick'
const DeveloperCard = props => {
    console.log("<DeveloperCard>")
    const ctx = useContext(AuthContext);
    const devctx = useContext(DevContext);
    //const [projectsData, setProjectsData] = useState([])

    const manageClickHandler = (event) => {
        if(props.displayState){
            return
        } else {
            props.onClick(event)
        }
    }

    // Creating the developer card array
    let developerCards = []
    //Don't map unless you have data to map too!
    if(props.displayState && devctx.projectData.length > 0){
        developerCards = devctx.projectData.map(data => {
            console.log(`%cCreating Project ID: ${data.id}`, "color:green; font-weight: 800;");
            return <ProjectCard key={data.id} data={data} onClick={props.onProjectClick} />
        });
    }
    return (
        <Card>
            <h3 onClick={manageClickHandler}>Projects in the Works</h3>
            {developerCards.length > 0 ? developerCards : ''}
        </Card>
    )
};

export default DeveloperCard;
// X --> <Dashboard>