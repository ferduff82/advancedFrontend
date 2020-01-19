import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../styles/att.scss';
import logo from '../assets/icon-168.png';
import DBConnection from '../config/DBConnection.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimes, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const firestore = DBConnection.firestore();

const SearchForm = (props) => {
    const [att, setAtt] = React.useState("");
    const [dni, setDni] = React.useState("");

    function onSubmit(e) {
        props.history.push(`./${dni}/${att}`)
    }

    return (
        <div className="att-container position-fixed text-center">
            <div className="container-fluid d-flex justify-content-center m-1 p-2">
                <div id="formContent">
                    <div className="closeButtonContainer">
                        <FontAwesomeIcon icon={faTimes} onClick={() => props.propsExtended.closeModal(false)}/>
                    </div>
                    <img src={logo} className="login-logo" alt="UMA"/>
                    <form onSubmit={() => onSubmit() }>
                        <label>DNI</label><br />
                        <input type="text" className="fadeIn first id" name="login"  value={dni}
                            placeholder=""  autoComplete="off" onChange={(e) => setDni(e.target.value)} /><br />
                        <label>Número de atención</label><br />
                        <input type="text" className="fadeIn second atentionNumber" name="login" 
                            placeholder=""  autoComplete="off" onChange={(e) => setAtt(e.target.value)} /><br />
                        <Link to={`/att/${dni}/${att}`} className="underlineHover">
                            <button className="btn m-1 text-center buttonSearchCode" type="submit">Buscar</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

const Att = (props) => {
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
                setAtt({patient: {}, mr: {}})
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

    const backToMain = () => {
        props.history.push(`/`)
    }

    const AttVoucher = () => {
        return (
            <div className="att-container position-fixed text-center">
                <header>
                    <div className="backToMain" onClick={() => backToMain()}>
                        <FontAwesomeIcon icon={faChevronLeft}/> 
                        <span> <strong>Back</strong></span>    
                    </div>
                </header>
                <div className="container-fluid d-flex justify-content-center m-1 p-2">
                { att.mr.dt_cierre ?
                    <div className="dossier-container">
                        <div className="successPage">
                            <div className="m-4 pt-4 pr-4 pb-2 pl-1 text-center rounded">
                                <h3>Constancia de atención válida</h3>
                                <div className="whatsappIcon">
                                    <FontAwesomeIcon icon={faCheckCircle} className="w-100 whatsappIcon" />
                                </div>
                                <div className="p-4" id="dossier">
                                    <b>Fecha:</b><br /> {att.mr && att.mr.dt_cierre}<br />
                                    <b>Paciente:</b><br /> {att.mr && att.patient.fullname}<br />
                                    <b>Médico:</b><br /> {doctor.fullname} <br />
                                    <b>Matrícula: </b><br /> {doctor.matricula} <br />
                                    {att.mr && att.mr.reposo !== "no" ? <> <b>Reposo sugerido:</b><br /> {att.mr.reposo} hs</> : <></>}<br />
                                    <br />
                                </div>
                                <br />
                            </div>
                        </div>
                    </div>
                : <div className="pt-5">No se registra ninguna atención con los datos suministrados</div> }
                </div>
            </div>
        )
    }

    if(props.match.params.att) {
        return <AttVoucher />
    } else {
        return <SearchForm propsExtended={props}/>
    }
}

export default withRouter(Att)