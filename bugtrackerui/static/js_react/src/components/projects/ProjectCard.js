import React, { useState } from "react";

import Card from "../ui/Card";

//Taking in Json data object as 'data'
const ProjectCard = props => {
    //const [theData, setTheData] = useState(props.data)
    console.log('this is <ProjectCard/>')
    //console.log(theData)
    console.log(props.data)
    let { title, sub_title: subTitle, start_date: startDate, end_date: endDate, percent_complete: percentComplete } = props.data

    //endDate manipulation
    let endDateStr = 'TBD';
    if (endDate != null || endDate != '') {
        endDate = new Date(Date.parse(endDate)); //gets date object
        const dateOptions = {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short',
        }
        endDateStr = `${endDate.toLocaleDateString('en-gb', dateOptions)} @ ${endDate.toLocaleTimeString('en-gb', timeOptions)}`;
    }


    return (
        <Card>
            <h3>{title}</h3>
            <h4>{subTitle}</h4>
            <p>Due: {endDateStr}</p>
            <p>Complete: {percentComplete / 100}%</p>
        </Card>
    )
};

export default ProjectCard;