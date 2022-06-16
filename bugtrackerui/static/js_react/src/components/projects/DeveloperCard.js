import React, {useContext, useEffect, useState} from "react";

import Card from "../ui/Card";
import ProjectCard from "./ProjectCard";

import AuthContext from "../store/auth-context";

const dummydata = {
    'title': 'Bug Tracker',
    'sub_title': 'Django and React',
    'start_date': '2022-06-06',
    'end_date': '2022-08-01',
    'percent_complete': 101//go with bps, per 10k
}

// takes in 'onClick' and 'displayState'
const DeveloperCard = props => {
    const ctx = useContext(AuthContext)
    const [projectsData, setProjectsData] = useState([])

    useEffect(()=>{
        // TODO: Pull out the fetch()
        if(ctx.isLoggedIn){
            fetch('http://localhost:4000/api/', {
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

    // Creating the developer card array
    let developerCards = []
    //Don't map unless you have data to map too!
    if(props.displayState && projectsData.length > 0){
        developerCards = projectsData.map(data => {
            return <ProjectCard data={data}/>
        })
    }
    return (
        <Card>
            <h3 onClick={manageClickHandler}>Projects in the Works</h3>
            {developerCards.length > 0 ? developerCards : ''}
        </Card>
    )
};

export default DeveloperCard;