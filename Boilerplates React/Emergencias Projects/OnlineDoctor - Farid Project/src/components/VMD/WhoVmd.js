import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight, faEdit } from '@fortawesome/free-solid-svg-icons'

const WhoVmd = () => {
    const dispatch = useDispatch()
    const [patients, setPatients] = useState(["Para mi"])
    const [inputValue, setInputValue] = useState("")
    const auth = useSelector((state) => state.queries.patient)

    React.useEffect(() => {
        var user
        console.log(typeof auth.fullname, "ok")
        if(typeof auth.fullname === "string" && auth.fullname !== "") {
            user = auth.fullname
            let newpatients = []
            newpatients.push(user)
            setPatients(newpatients)
        } 
    }, [auth])
    
    const addPerson = () => {
        console.log("Add person", inputValue)
        let newpatients = patients
        newpatients.push(inputValue)
        setPatients(newpatients)
        setInputValue("")
        console.log(patients)
    }

    return(
       <>
        <div className="vmd-question-card">
            <p className="vmd-question-message">¿Para quién solicita el médico?</p>
            {patients.map((patient, index) => {
                return <div className="btn btn-patient" key={index} onClick={() => dispatch({type: 'SET_VMD_STAGE', payload: "where"})}>
                            <input type="radio" name="radios" id={index} value={index} style={{display: 'none'}} />
                            <label for={index} className="mb-0">{patient}</label>
                            <FontAwesomeIcon icon={faEdit} className="vmd-select-icon" />
                        </div> 
            })}
            <div className="d-block text-center">
                <input type="text" placeholder="Agregar otra persona"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.keyCode === 13 ? addPerson() : ""} />
                    <FontAwesomeIcon icon={faChevronCircleRight} className="vmd-add-icon" onClick={() => addPerson()} /><br />
            </div>
        </div>
       </>
    )
}

export default WhoVmd