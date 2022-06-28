import React from "react";

import styles from './Card.module.css';

const Card = props => {
    let cardStyles = `${props.className} ${styles.card}`;

    if (props.onClick) {
        cardStyles = `${cardStyles} ${styles.clickable}`
    }

    // Pass in data if we have any
    const onClickHandler = event => {
        if (props.onClick) {
            if (props.data) {
                console.log('We Have Data')
                props.onClick(event, props.data);
            } else {
                console.log('No Data')
                event.stopPropagation();
                props.onClick(event);
            }
        }
    }

    return (
        <div className={cardStyles} onClick={onClickHandler}>
            {props.children}
        </div>
    )
};

export default Card;