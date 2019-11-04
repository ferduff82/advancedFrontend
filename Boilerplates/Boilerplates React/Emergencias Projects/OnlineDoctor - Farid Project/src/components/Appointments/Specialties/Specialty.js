import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

const json = {
    specialties: [
        'Cardiologia',
        'Clinica_Medica',
        'Dermatologia',
        'Diabetes',
        // 'Dynamics',
        'Endocrinologia',
        // 'Estudios_Cardiologia',
        'Flebologia',
        'Fonoaudiologia',
        'Gastroenterologia',
        'Ginecologia',
        'Hematologia',
        'Kinesiologia',
        'Nefrologia',
        'Neumologia',
        'Neurologia',
        'Nutricion',
        'Oftalmologia',
        'Otorrinolaringologia',
        'Pediatria',
        'Traumatologia',
        'Urologia'
    ],
    onlineSpecialties: [
        'online_clinica_medica',
        'online_nutricion',
        'online_traumatologia',
        'online_psicologia'
    ]
}

const Specialty = (props) => {
    return(
        <ul className="text-center">
        { json.onlineSpecialties.map((sp) => 
        <Link to={`/${props.match.dni}/${props.match.ws}/appointments/online/${sp.toLowerCase()}/calendar`} className="specialty-name">
            <li className="specialty-list" key={sp}>
                {sp.replace(/_/g, " ")}
            </li>
        </Link> )}
        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        match: state.assignations.match
    }
}

export default connect(mapStateToProps)(Specialty)