import React from 'react';
import StatsSingle from './StatsSingle';
import ReactTypingEffect from 'react-typing-effect';

const Stats = () => {
/*     const UMA = <span className="uma-text"><span className="blue-text">U</span><span className="green-text">M</span><span className="red-text">A</span></span>
 */    return(
        <div className="stats-container">
                <br />
                <h2 className="stats-title"><span className="white-text">
                <ReactTypingEffect text="UMA EN NÚMEROS" eraseDelay="9999"></ReactTypingEffect></span></h2>
            <div className="row stats-stats no-margin-bottom">
            <StatsSingle 
                    icon="healing" 
                    iconStyle="large material-icons blue-text"
                    textFirst="UMA atendió a más de " 
                    number="12123" 
                    textSecond=" personas." />
            <StatsSingle 
                    icon="local_hospital" 
                    iconStyle="large material-icons red-text"
                    textFirst="UMA envía " 
                    number="12123" 
                    textSecond=" médicos a domicilio por día." />
            <StatsSingle 
                    icon="check" 
                    iconStyle="large material-icons yellow-text"
                    textFirst="Los médicos tardan un promedio de " 
                    number="15" 
                    textSecond=" minutos en llegar." />
            </div>
        </div>
    )
}

export default Stats;