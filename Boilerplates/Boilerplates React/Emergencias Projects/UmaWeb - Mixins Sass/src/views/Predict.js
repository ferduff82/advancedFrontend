import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import '../styles/att.scss';
import '../styles/predict.scss';
import logo from '../assets/icon-168.png';
import DBConnection from '../config/DBConnection.js';

const firestore = DBConnection.firestore()

const SearchForm = (props) => {
    const dispatch = useDispatch()
    const [symptoms, setSymptoms] = React.useState("")
    const [predict, setPredict] = React.useState("")
    const autoSymptoms = useSelector(state => state.predict.symptoms)
    const writingSymptom = useSelector(state => state.predict.writingSymptom)
    const inputProps = {
        placeholder: 'Escriba sus síntomas',
        symptoms
      };
      
    const symptomList = [
        "epigastralgia",
        "disnea",
        "TA 80/40",
        "tos",
        "fiebre",
        "edema de miembros inferiores",
        "dolor abdominal",
        "nauseas",
        "defensa",
        "epigastralgia",
        "diarrea sanguinolenta",
        "TA 120/80",
        "cefalea",
        "vómitos",
        "rigidez de nuca",
        "fotofobia",
        "dificultad para hablar",
        "debilidad del miembro superior derecho",
        "enalapril",
        "diabético",
        "dolor torácico",
        "dolor torácico incaracterístico",
        "dolor torácico opresivo",
        "irradiado a mandíbula",
        "disnea"
    ]


    async function onSubmit(input) {
        input.preventDefault()
        const headers = { 'Content-type': 'application/json' }
        let data = {
            'texto': writingSymptom,
            }
        if(writingSymptom !== "") {
            await axios.post( `https://uma-v2.appspot.com/diagnostic_web`, data, headers)
            .then(res => {
                let diagPred = res.data.split("#", 6)
                setPredict(diagPred)
                console.log(res)
            })
            .catch(err => setPredict(err))
        }
    }

    function reset() {
        dispatch({type: 'RESET_SYMPTOM'})
        setPredict("")
    }

    return (
        <div className="att-container d-flex text-center">
        <div className="container-fluid d-flex justify-content-center m-1 p-2">
            <div id="formContent">
            <img src={logo} className="login-logo" alt="UMA"/>
                <form onSubmit={(e) => onSubmit(e) }>
                    <b>¿Cuáles son sus síntomas?</b><br />
                    {/* <b>{autoSymptoms + " " + writingSymptom}</b><br /> */}
                    <input type="text" id="login" name="login"  value={writingSymptom}
                        autoComplete="off"  onChange={(e) => dispatch({ type: 'WRITE_SYMPTOM', payload: e.target.value})}/><br />
                    {/* <InputAutosuggestion suggestions={symptomList} /><br /> */}
                    <div className="btn btn-blue-lg m-1 text-center" onClick={() => reset()}>Borrar</div>
                    <button className="btn btn-blue-lg m-1 text-center" type="submit">Predecir</button>
                </form>
            {predict !== "" && 
            <div>
                {console.log(predict)}
            <h5>Diagnóstico</h5>
                <div className="text-center pt-3 pl-3 pr-3 pb-3">
                    <div className="diagnostic-text-container">
                        <span className="diagnostic-text">{predict[0]}</span>
                    </div>
                    <div className="progress diagnostic-progressbar">
                        <div className="progress-bar progress-bar-striped" style={{width: `${predict[1]}%`, height: "27px"}}>{`${predict[1]}%`}</div>
                    </div>
                    <div className="diagnostic-text-container">
                        <span className="diagnostic-text">{predict[2]}</span>
                    </div>
                    <div className="progress diagnostic-progressbar">
                        <div className="progress-bar progress-bar-striped" style={{width: `${predict[3]}%`, height: "27px"}}>{`${predict[3]}%`}</div>
                    </div>
                    <div className="diagnostic-text-container mt-2">
                        <span className="diagnostic-text">{predict[4]}</span>
                    </div>
                    <div className="progress diagnostic-progressbar">
                        <div className="progress-bar progress-bar-striped" style={{width: `${predict[5]}%`, height: "27px"}}>{`${predict[5]}%`}</div>
                    </div>
                </div>
            </div>
            }
            </div>
        </div>
        </div>
    )
}


const Predict = (props) => {
    const [att, setAtt] = React.useState({mr: {}, patient: {}, provider: {}})
    const [doctor, setDoctor] = React.useState({})

    React.useEffect(() => {
        if(props.match.params.att) {
            try {
            let ficha = atob(props.match.params.att)
            console.log(ficha, props.match.params.att)
            const usersQuery = firestore.collection('events').doc('mr').collection(props.match.params.dni).doc(ficha)
            usersQuery.get()
                    .then((r) => {
                        r.data().mr && setAtt(r.data())
                        getDoctor(r.data().provider.cuit)
                    })
                    .catch((e) => console.log(e))
            } catch (err) {
                setAtt({patient: {}})
            }
        }   
        }, [props.match.params.att])

        function getDoctor(cuit) {
            const docQuery = firestore.collection('providers').doc(cuit)
                docQuery.get()
                    .then((doc) => {
                        setDoctor(doc.data())
                        console.log(doc.data())
                    })
                    .catch(err => console.log(err))
        }

        return <SearchForm />
}

export default withRouter(Predict)