import React, { useState } from "react";

import Card from "../ui/Card";

//Taking ProjectNode and an 'onClick'
const ProjectCard = props => {
    console.log('Rendering <ProjectCard>')
    let node = props.data;
    let endDate = node.endDate;

    //endDate manipulation
    let endDateStr = 'TBD';
    if (node.endDate != null || node.endDate != '') {
        endDate = new Date(Date.parse(node.endDate)); //gets date object
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
    //click comes from DeveloperCard or OwnershipCard
    return (
        <Card onClick={props.onClick} data={props.data}>
            <input type="hidden" value={node.id} />
            <h3>{node.title}</h3>
            <h4>{node.subTitle}</h4>
            <p>Due: {endDateStr}</p>
            <p>Complete: {node.percentComplete / 100}%</p>
        </Card>
    )
};

export default ProjectCard;