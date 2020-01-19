import React from 'react';

const HowWorksCard = (props) => {
    return(
        <div>
            <div className="row no-margin-bottom">
                <div className="howWorks-img col s12 m6">
                    <img src={props.image} alt="Médico a domicilio" />
                </div>
                <div className="howWorks-text col s12 m6">
                    <h2><span className="yellow-text">{props.textFirst}</span><span className="white-text"> {props.textSecond}</span></h2>
                    {/*<p className="howWorks-details">Los médicos de UMA son doctores y especialistas que nos eligieron. Estamos avalados por los mejores estandares de salud y organizacionales</p>*/}                </div>
            </div>
        </div>
    )
}

export default HowWorksCard;

