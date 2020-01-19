import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import DBConnection from '../../config/DBConnection';
import moment from 'moment';

const UserNotFound = (props) => {
    const dispatch = useDispatch()
    const [questions, setQuestions] = useState(false)
    const [copago, setCopago] = useState(true)
    const [verify, setVerify] = useState(true)
/*     let gotCopago = (e) => {
        e.preventDefault();
        props.history.push(`/`);
    } */

    let handleAnswers = (state, reason) => {
        let cuit = atob(props.match.params.cuit)
        let url = "https://providers-dot-uma-v2.appspot.com/notify_copago"
        let data
        if(reason) {
            data = {
                cuit: cuit,
                received: state,
                reason: reason
            }
        } else {
            data = {
                cuit: cuit,
                received: state,
            }
        }

        const headers = { 'Content-type': 'application/json' }
        axios.post(url, data, {headers})
        .then(function (res) {
            dispatch({type: 'LOADING', payload: false})
            props.history.push(`/`);
        })
        .catch(function (res) {
            console.log("No ok", res)
            dispatch({type: 'LOADING', payload: false})
        }) 
    }


    React.useEffect(() => {
        const firestore = DBConnection.firestore()
        let date = moment(new Date()).format('YYYY-MM-DD')
        let query = firestore.collection('assignations').doc(date).collection('VMD')
        .where("request.mr_id", "==", props.match.params.id)
        query.onSnapshot({
            includeMetadataChanges: true
        }, async function (snapshot) {
            snapshot.forEach((subDoc) => {
                if(subDoc.data().request.intervention !== "0") {
                    setCopago(true)
                    setVerify(false)
                } else if (subDoc.data().request.intervention === "0") {
                    setCopago(false)
                    setVerify(false)
                } else {
                    setVerify(false)
                }
            })
        })
    }, [copago, verify, props.match.params.id])

    if(copago) {
    return(
    <>
        {questions ? 
        <>
            <h5 className="text-center mt-5 p-3">¿Por qué motivo no cobró el copago?</h5>
            <div className="p-5">
                    <div className="d-block text-center mt-2">
                        <span className="btn btn-outline-info w-100 p-2 m-1" onClick={() => handleAnswers(false, "1. El paciente se niega")}>El paciente se niega</span>
                        <span className="btn btn-outline-info w-100 p-2 m-1" onClick={() => handleAnswers(false, "2. Refiere sin copago")}>Refiere sin copago</span>
                        <span className="btn btn-outline-info w-100 p-2 m-1" onClick={() => handleAnswers(false, "3. Refiero no informado")}>Refiere no informado</span>
                        <span className="btn btn-outline-info w-100 p-2 m-1" onClick={() => handleAnswers(false, "4. Muestra certificado o PMI")}>Muestra certificado o PMI</span>
                    </div>
            </div>
        </> : <>
            {verify ? <div className="verify-copago">Verificando copago... </div> : <></>}
            <h5 className="text-center mt-5 p-3">¿Cobró el copago?</h5>
            <div className="p-5">
                    <div className="d-block text-center mt-2">
                        <span className="btn btn-outline-info w-100 p-2 m-1" onClick={() => handleAnswers(true)}>Sí</span>
                        <span className="btn btn-outline-info w-100 p-2 m-1" onClick={() => setQuestions(true)}>No</span>
                    </div>
            </div>
        </>}
    </>
    )} else {
       return <><div>No tiene copago</div>{props.history.push(`/`)}</>
    }
}

export default UserNotFound