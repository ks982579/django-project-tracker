import React, { useState } from "react";

import Card from "../ui/Card";

//Taking in Json data object as 'data' and an 'onClick'
const ProjectCard = props => {
    let { id, title, sub_title: subTitle, start_date: startDate, end_date: endDate, percent_complete: percentComplete } = props.data

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

    //click comes from DeveloperCard or OwnershipCard
    return (
        <Card onClick={props.onClick} data={props.data}>
            <input type="hidden" value={id} />
            <h3>{title}</h3>
            <h4>{subTitle}</h4>
            <p>Due: {endDateStr}</p>
            <p>Complete: {percentComplete / 100}%</p>
        </Card>
    )
};

export default ProjectCard;