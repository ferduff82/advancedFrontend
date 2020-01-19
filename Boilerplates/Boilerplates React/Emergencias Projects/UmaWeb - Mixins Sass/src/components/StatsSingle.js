import React from 'react';

const StatsSingle = (props) => {
    return(
        <div className="col s12 m4">
            <div className="stats-icon col s4 m3"><i className={props.iconStyle}>{props.icon}</i></div>
            <div className="stats-text col s6 m6">{props.textFirst}<span className="yellow-text">{props.number}</span>{props.textSecond}</div>
        </div>
    )
}

export default StatsSingle;