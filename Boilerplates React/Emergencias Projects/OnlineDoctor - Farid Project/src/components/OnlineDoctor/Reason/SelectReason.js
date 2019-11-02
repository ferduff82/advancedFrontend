
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
// import Autocomplete from '../../GeneralComponents/Autocomplete';
import {symptoms} from '../../../config/symptoms'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimesCircle, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {currentDate, yearAndMonth} from '../../Utils/dateUtils';
import {make_appointment} from '../../../config/endpoints';

const SelectReason = (props) => {
    const dispatch = useDispatch()
    const questionsList = useSelector((state) => state.queries.questions)
    const symptomsList = useSelector((state) => state.queries.symptoms)
    const selectedSymptoms = useSelector((state) => state.assessment.selectedSymptoms)
    const nextAppointment = useSelector((state) => state.assignations.nextAppointment)
    var user = useSelector((state) => state.queries.patient)
    const coords = useSelector((state) => state.queries.geolocation)
    const [otherSymptoms, setOtherSymptoms] = React.useState("")


    useEffect(() => {
        dispatch({type: 'GET_QUESTIONS', payload: symptoms})
    }, [dispatch])

    useEffect(() => {
        var symptoms = []
        questionsList.forEach((symptom) => {
            symptoms.push(symptom.symptom)
        })
        if(symptoms.length > 0) {
            console.log(symptoms)
            dispatch({type: 'GET_SYMPTOMS', payload: symptoms})
        }
    }, [questionsList, dispatch])


    function submitReason(e) {
            e.preventDefault();
            postData()
        }

    function addReason(reason) {
        dispatch({type: 'SET_SYMPTOM', payload: reason})
    }
    
    function deleteReason(symptom) {
        let newTags = selectedSymptoms.filter((tags) => tags !== symptom)
        dispatch({type: 'REMOVE_SYMPTOM_TAG', payload: newTags})
    }

    async function postData() {
        let date = currentDate()
        let appointment
        try {
            appointment = nextAppointment.date.replace(/-/g, "").concat(nextAppointment.time.replace(/:/g, ""))
        } catch (err) {
            props.history.push('/')
        }
        let cuil = nextAppointment.cuil
        var symptoms = ""
        if(selectedSymptoms != null) {
            symptoms = selectedSymptoms.join(". ").concat(". " + otherSymptoms)
        }
        const headers = { 'Content-type': 'application/json' }
        var userVerified
        if(user.ws && user.ws !== undefined) {
            userVerified = user
        } else if (localStorage.getItem('userData')) {
            userVerified = JSON.parse(localStorage.getItem('userData'))
        } 
        let data={
            'ws': userVerified.ws || user.ws, 
            'dni': userVerified.dni || user.dni,
            'msg': 'make_appointment',
            'dt': date,
            'ruta': "online_clinica_medica/" + yearAndMonth() + "/" + appointment + "_" + cuil,
            'specialty': 'online_clinica_medica',
            'motivo_de_consulta': symptoms,
            'sex': userVerified.sex || '',
            'age': userVerified.age || '',
            'lat': coords.lat || '-34.5633155',
            'lon': coords.lng || '-58.4739184' // Coordenadas de Melian si no hay location
        }
        localStorage.setItem('currentAppointment', JSON.stringify(data.ruta))
        dispatch({type: 'LOADING', payload: true})
        await axios.post(make_appointment, data, { headers })
        .then(res => {
            dispatch({type: 'LOADING', payload: false})
            dispatch({type: 'CLOSE_QUEUE_DINAMIC'})
            dispatch({type: 'QUEUE_VALUE'})
            props.history.push('./queue')
            dispatch({type: 'CLOSE_QUEUE_DINAMIC'})
            localStorage.setItem('currentMr', JSON.stringify(res.data.assignation_id))
        })
        .catch(err => {
            dispatch({type: 'LOADING', payload: false})
            props.history.push(`/notfound/${err}`)
        })
    }

    return(
    <>
        <div className="dinamic-question">
            <span className="question-title">Motivo de la consulta</span>
            <div className="tags-container">
                {selectedSymptoms.length >= 1 ? selectedSymptoms.map((symptom, index) => {
                        return <div className="tag" key={index} onClick={(e) => deleteReason(symptom)}>
                                    <span className="tag-text">{symptom}</span>
                                    <FontAwesomeIcon icon={faTimesCircle} className="tag-delicon" />
                                </div>
                    }) : <div className="tag-empty">No ha agregado motivos</div>}
            </div>
        </div>
        <div className="symptom-list-container">
            {symptomsList.map((symptom) => 
                <div className="symptom-list d-flex justify-content-between" key={symptom}  onClick={() => addReason(symptom)}>
                    <span className="symptom-text">{symptom}</span>
                    <FontAwesomeIcon icon={faPlusCircle} className="symptom-addicon" />
                </div>)}
        </div>
        <div className="dinamic-add-reason">
            <div className="dinamic-reasons d-block text-center">
                <input type="text" onChange={(e) => setOtherSymptoms(e.target.value)} 
                    value={otherSymptoms} placeholder="Otros síntomas" />
            </div>
            <button className="btn btn-blue-lg confirmConsultReason" onClick={(e) => submitReason(e)}>Confirmar</button>
        </div>
    </>
    )
}

export default withRouter(SelectReason)