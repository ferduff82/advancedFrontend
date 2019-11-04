import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { user_cancel } from '../../../config/endpoints';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import 'moment/locale/es';
import moment from 'moment';
import QuestionDetail from './Questions/QuestionDetail';
import Questions from './Questions/Questions';
import AskFirst from './Questions/AskFirst'
import DBConnection from '../../../config/DBConnection';
import {Link, withRouter} from 'react-router-dom'
import tone from '../../../assets/ring.mp3';

const Queue = (props) => {
    const dispatch = useDispatch()
    const [calling, setCalling] = useState(false)
    const [dni, setDni] = useState()
    const answerQuestions = useSelector(state => state.front.answerQuestions)
    const openQuestions = useSelector(state => state.front.openDetails)
    const remainingText = useSelector(state=>state.front.remainingText)
    const nextAppointment = useSelector(state => state.assignations.nextAppointment)
    const assessment = useSelector(state => state.assessment)
    const questions = useSelector(state => state.queries.questions)
    const call = useSelector(state => state.queries.callSettings)
    const mr = useSelector(state => state.queries.medicalRecord[0])
    const user = useSelector(state => state.queries.patient)

    useEffect(() => {
        if(!nextAppointment.time) {
            props.history.push('/')
        }
    }, [])


    // Effect to handle remaining time
    useEffect(() => {   
        var now = moment(new Date()).format('HHmm')
        var remainingTime = 0
        if(nextAppointment && nextAppointment.time) {
            let next = nextAppointment.time.replace(/:/g, "")
            next = parseInt(next.slice(0, 2) * 60) + parseInt(next.slice(2, 4))
            now = parseInt(now.slice(0, 2) * 60) + parseInt(now.slice(2,4)) 
            remainingTime = next - now
        }
        if(remainingTime > 0) {
            let text = `Faltan aproximadamente ${remainingTime} minutos para su atención`
            dispatch({type: 'REMAINING_ATT_TIME', payload: text})
        } else {
            let text = `En aproximadamente 10 minutos será atendido`
            dispatch({type: 'REMAINING_ATT_TIME', payload: text})
        }
        if(props.newAtt === false) {
            dispatch({type: 'SHOW_ASK_TEXT', payload: false})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [nextAppointment])

      // Effect to get DNI
      useEffect(() => {
        if (localStorage.getItem('userData') !== "") {
            let localStorageDni = localStorage.getItem('userData')
            let storagedni = JSON.parse(localStorageDni).dni
            setDni(storagedni)
        } else if(user.dni && user.dni !== "") {
            setDni(user.dni)
        } else if (props.appointment && props.appointment.appointments["0"]["1"]) {
            setDni(props.appointment.appointments["0"]["1"])
        } 
      }, [dni, props.appointment, user.dni])

      // Effect to get SalaToken
      useEffect(() => {
        const firestore = DBConnection.firestore()
        if(call.room === '') {
            try {
            let queryUser = firestore.collection('auth').doc(props.match.params.ws)
            queryUser.onSnapshot(async function(doc) {
                if(doc.data()._start_date !== "") {
                    let data = doc.data()._start_date.split('///')
                    dispatch({type: 'SET_CALL_ROOM', payload: {room: data[0], token: data[1]}})
                } else {
                    dispatch({type: 'SET_CALL_ROOM', payload: {room: "", token: ""}})
                }
            })
            }
            catch (err) {
                dispatch({action: 'ERROR', payload: "FAILED QueryUser " + err})
            }
        }
      }, [dispatch, call.room, props.match.params.ws])

      // Effect to listen call
      useEffect(() => {
        if(call.room !== '') {
            setCalling(true)
        } else {
            setCalling(false)
        }
      }, [call])

      // Effect to start audio calling
      useEffect(() => {
          try {
              var audioControl = document.getElementById("toneAudio");
              dispatch({type: 'START_CALL'})
              if(audioControl !== null) {
                  var interval = setInterval(() => {
                      audioControl.play()
                  }, 3000)
              }
              return () => clearInterval(interval);
          } catch (err) {
              alert(err)
          }
      }, [calling, dispatch])

        // Effect that get all selected questions for the user's symptoms and save them to store
        useEffect(() => {
            function questionsForEachSymptom() {
                let selectedQuestions = []
                assessment.selectedSymptoms.forEach((symptom) => {
                    let filterQuestions = questions.filter((t) => {
                        if(t.symptom === symptom) {
                            return t
                        }
                    })
                    selectedQuestions.push(filterQuestions[0].questions)

                })
                if(selectedQuestions.length === 0) {
                    dispatch({type: 'SHOW_ASK_TEXT', payload: false})
                } else {
                    dispatch({type: 'SET_SELECTED_QUESTIONS', payload: selectedQuestions})
                }
            }
            questionsForEachSymptom()
        }, [assessment.selectedSymptoms, questions, dispatch])

      function cancelAppointment() {
        dispatch({type: 'LOADING', payload: true})
        let date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        let yearAndMonth = moment(new Date()).format('YYYYMM')
        let documentBuild 
        try {
            documentBuild = `assignations/online_clinica_medica/${yearAndMonth}/${nextAppointment.date.replace(/-/g, "")}${nextAppointment.time.replace(/:/g, "")}_${nextAppointment.cuil}`
            let aid, ws
            if(mr.assignation_id) {
                aid = mr.assignation_id
                ws = props.match.params.ws
            } else if (nextAppointment.appointments["0"]) {
                ws = nextAppointment.appointments["0"]["6"]
                aid = nextAppointment.appointments["0"]["14"]
            } else {
                props.history.push('/')
            }
            let data = {
                    'ws': ws,
                    'dni': dni,
                    'dt': date,
                    'assignation_id': aid,
                    'appointment_path': documentBuild
                }
                let headers = {'Content-Type': 'Application/Json'}
                axios.post(user_cancel, data, headers)
                .then((res) => {
                    dispatch({type: 'RESET_ALL'})
                    props.history.push('/')
                })
                .catch((err) => {
                    dispatch({action: 'ERROR', payload: err})
                    dispatch({type: 'RESET_ALL'})
                    dispatch({type: 'LOADING', payload: false})
                    props.history.push('/')
                })
            } catch (err) {
                dispatch({type: 'RESET_ALL'})
                dispatch({type: 'LOADING', payload: false})
                console.log(err)
                props.history.push('/')
            }
      }

    return(
    <>  {openQuestions ? <QuestionDetail /> : <></>}
        <div className="dinamic-time">
           {remainingText}
        </div>
        <div className="dinamic-queue">
            {calling ?
                <div className="ico-calling">
                    <Link to={`/${dni}/onlinedoctor/attention/`}><FontAwesomeIcon icon={faPhoneAlt} /></Link>
                </div>
                :
                <div className="ico-queue">
                    <FontAwesomeIcon icon={faClock} />
                </div>
            }
            {answerQuestions ?
            <>
                <Questions cancel={() => cancelAppointment()}/>  
            </> :
            <>
                <AskFirst cancel={() => cancelAppointment()}/>
            </>
            }
            {calling &&
                <>
                 <p>El médico te está llamando. <br /><Link to={`/${user.dni}/onlinedoctor/attention/`}>Ingresar al consultorio.</Link></p> 
                 <audio src={tone} id="toneAudio" autoPlay />
                </>}
        </div>
    </>)
}

export default withRouter(Queue)