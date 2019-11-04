import React from 'react';
import {useDispatch} from 'react-redux';

const WhereVmd = () => {
    const dispatch = useDispatch()
    return(
       <>
        <div className="vmd-question-card">
            <p className="vmd-question-message">¿Dónde es la atención?</p>
            <button className="btn btn-patient" onClick={() => dispatch({type: 'SET_VMD_STAGE', payload: "triage"})}>Aguero 1595</button> 
            <input type="text" placeholder="En otro lugar" style={{width: '100%'}} />
        </div>
       </>
    )
}

export default WhereVmd