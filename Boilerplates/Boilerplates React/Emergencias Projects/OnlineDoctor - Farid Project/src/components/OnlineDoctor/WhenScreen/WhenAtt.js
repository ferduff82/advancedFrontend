import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import {searchActiveProviders} from '../../../store/actions/firebaseQueries';
import DBConnection from '../../../config/DBConnection';
import {dateWoHour, timeWoDate, yearAndMonth} from '../../Utils/dateUtils';
import {getAge, getGender} from '../../Utils/patientUtils';
import DinamicScreen from '../../GeneralComponents/DinamicScreen';
import Loading from '../../GeneralComponents/Loading';
import Queue from '../AttQueue/Queue';
import 'moment/locale/es';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopMedical } from '@fortawesome/free-solid-svg-icons';

const WhenScreen = (props) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.queries.patient)
    const remainingText = useSelector(state=> state.front.remainingText)
    const assignations = useSelector((state) => state.assignations.all)
    const nextAppointment = useSelector((state) => state.assignations.nextAppointment)
    const firestore = DBConnection.firestore()
    const [remaining, setRemaining] = useState()
    const [empty, setEmpty] = useState(false)
    const [haveAtt, setHaveAtt] =  useState(false)
    const [tOut, settOut] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            settOut(true)
        }, 3000)
    }, [])

    useEffect(() => {
        var now = moment(new Date()).format('HHmm')
        let remainingTime
        if(nextAppointment && nextAppointment.time) {
            let next = nextAppointment.time.replace(/:/g, "")
            // next = (next.slice(0, 2) * 60 + next.slice(2,4)) 
            next = parseInt(next.slice(0, 2) * 60) + parseInt(next.slice(2, 4))
            now = parseInt(now.slice(0, 2) * 60) + parseInt(now.slice(2,4)) 
            remainingTime = next - now
        }
        if(remainingTime > 0) {
            let text = `En ${remainingTime} minutos`
            dispatch({type: 'REMAINING_ATT_TIME', payload: text})
        } 
    }, [dispatch, nextAppointment])

    useEffect(() => {
        async function query(doctors) {
            let currentDate = await dateWoHour()
            let yearMonth = await yearAndMonth()
            let query = firestore.collection('assignations').doc('online_clinica_medica').collection(yearMonth)
                        .where("date", "==", currentDate).limit(100)
            await query.onSnapshot({
                includeMetadataChanges: false
            }, async function (snapshot) {
                let assigns = []
                await snapshot.forEach((subDoc) => {
                    let data = subDoc.data()
                    // let activeMeds = ["20321314385"] 
                    let match = doctors.find(d => d.cuit === data.cuil && d.enable === "si")
                    if(match) {
                        assigns.push(data)
                    }
                })
                await dispatch({type: 'GET_ASSIGNS', payload: assigns})
            })
        }
    searchActiveProviders("ONLINE")
        .then(r => { query(r) })
        .catch(err => { 
            console.log(err)
            dispatch({type: 'ERROR', payload: 'Active Providers Query: ' + err})
        })
    }, [dispatch])

    useEffect(() => {
        if(!user) {
            var user = props.match.params.ws
        }
        let queryUser = firestore.collection('auth').doc(user)
        queryUser.get().then((p) => {
            if(p.exist) {
                let data = p.data()
                let userAge = getAge(p.data())
                let userGender = getGender(p.data())
                let payload = {...data, age: userAge, sex: userGender}
                dispatch({type: 'MATCH_TO_STORE', payload: payload})
            }
        })
    }, [dispatch, firestore, props.match.params.ws])

    useEffect(() => {
        function getFirstAvailaible() {
            let firstFound
            if(assignations && assignations.length >= 2) {
                let currentTime = timeWoDate().replace(':', '')
                firstFound = assignations.find((a) => {
                    try {
                        if(a.appointments["0"] && a.appointments["0"]["6"] === props.match.params.ws && a.state === "ASSIGN") {
                            setHaveAtt(true)
                            return a
                        } else if (a.appointments["0"] && a.appointments["0"].length === 0) {
                            return a.time.replace(':', '') > currentTime
                        }
                    }
                    catch (err) {
                        console.log(err)
                        dispatch({type: 'ERROR', payload: err})
                    }
                })
            }
            if(firstFound && firstFound !== undefined) {
                let first = firstFound.date + ' ' + firstFound.time
                let freeAppointment = {...firstFound, time2: new Date(first)}
                dispatch({type: 'SET_NEXT_APPOINTMENT', payload: freeAppointment})
            } else {
                setEmpty(true)
            }
            }
        getFirstAvailaible()
        }, [assignations, user, dispatch])

    useEffect(() => {
        if(nextAppointment && nextAppointment.date) {
            let appointment = nextAppointment.date.replace(/-/g, "").slice(0, -2).concat(nextAppointment.time)
            setRemaining(appointment)
        }
    }, [nextAppointment])
    
    return(
        <>
            <DinamicScreen>
                {haveAtt ? 
                <>
                    <Queue newAtt={false} appointment={nextAppointment}/>
                </>
                :
                <>
                {remaining ?
                    <>
                        <div className="when-question">¿Para cuándo desea la atención?</div>
                        <div className="dinamic-answer">
                                <Link to={`/${user.ws || props.match.params.ws}/onlinedoctor/reason`} className="btn btn-blue-lg">Para ahora  ({remainingText}) </Link>
                                {/* <Link to={`/${user.dni}/${user.ws}/appointments/online`} className="btn btn-blue-lg">Reservar para otro momento</Link> */}
                                <div className="ico-container"><FontAwesomeIcon icon={faLaptopMedical} /></div>
                        </div>
                    </>
                :
                   empty && tOut ? 
                   <>
                    <div className="dinamic-time mt-5">No se encontraron médicos disponibles para hoy</div>
                    <div className="detail-modal-content questionsContainer text-center">
                        <div className="btn btn-blue-lg" onClick={() => props.history.push('/')}>Volver</div>
                    </div>
                    </> : <Loading />
                }
                </>
                }
            </DinamicScreen>
        </>
    )
}

export default WhenScreen