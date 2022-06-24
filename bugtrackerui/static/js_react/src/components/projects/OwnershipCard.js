import React, {useContext, useEffect, useState} from "react";

import Card from "../ui/Card";
import ProjectCard from "./ProjectCard";

import AuthContext from "../store/auth-context";

// takes in 'onClick' and 'displayState' and 'onProjectClick'
const OwnershipCard = props => {
    const ctx = useContext(AuthContext)
    const [fullDisplay, setFullDisplay] = useState(false);
    const [projectsData, setProjectsData] = useState([])

    //setFullDisplay(props.displayState)

    useEffect(()=>{
        // TODO: Pull out the fetch()
        console.log("Fetching 'What I Own'")
        if(ctx.isLoggedIn){
            fetch('http://localhost:4000/api/what-i-own/', {
                method: 'GET',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Token ${ctx.loginToken}`,
                }
            }).then(response => {
                return response.json();
            }).then(jsonData => {
                //Set state with the data to properly render Component. 
                setProjectsData(jsonData); 
            })
        }
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