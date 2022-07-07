import React, { useState } from "react";

import Card from "../ui/Card";

//Taking ProjectNode and an 'onClick'
// data = {id, task_name, description, start_date, ...
// ... end_date, percent_complete, parent_task, developers, children}
const ProjectCard = props => {
    console.log('Rendering <ProjectCard>')
    let {id, 'task_name': taskName, description, 'start_date':startDate, 'end_date':endDate, 'percent_complete':percentComplete } = props.data;

    //endDate manipulation
    let endDateStr = 'TBD';
    if (endDate != null && endDate != '') {
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
    //click comes from DeveloperCard
    return (
        <Card onClick={props.onClick} data={props.data}>
            <input type="hidden" value={id} />
            <h3>{taskName}</h3>
            <p>Due: {endDateStr}</p>
            <p>Complete: {percentComplete / 100}%</p>
        </Card>
    )
};

export default ProjectCard;
// X --> <DeveloperCard>