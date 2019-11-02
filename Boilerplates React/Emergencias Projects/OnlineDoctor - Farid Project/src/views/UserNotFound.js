import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {user_online} from '../config/endpoints';
import {withRouter, Link} from 'react-router-dom';
import {getPatientData} from '../store/actions/firebaseQueries';
import moment from 'moment';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import app from "../config/DBConnection";
import Loading from '../components/GeneralComponents/Loading';
import {GenericHeader} from '../components/GeneralComponents/Headers';
import MobileModal from '../components/GeneralComponents/Modal/MobileModal';

import '../../src/styles/generalcomponents/register.scss';

const UserNotFound = (props) => {
    const dispatch = useDispatch()
    const [modalDisplay, setModalDisplay] = useState(false);
    const user = useSelector(state => state.queries.patient)
    const loading = useSelector((state) => state.front.loading)
    const isTransport = props.history.location.pathname.split('/').pop() === "transport"

    /* Redux consts */
    const getId = useSelector((state) => state.register.dni);
    const getEmail = useSelector((state) => state.register.email);
    const getDay = useSelector((state) => state.register.day);
    const getMonth = useSelector((state) => state.register.month);
    const getYear = useSelector((state) => state.register.year);
    const getDate = useSelector((state) => state.register.dt);
    const getSex = useSelector((state) => state.register.sex);
    const getAddress = useSelector((state) => state.register.address);
    const getCity = useSelector((state) => state.register.city);
    const getPiso = useSelector((state) => state.register.piso);
    const getWs = useSelector((state) => state.register.ws);
    const getOs = useSelector((state) => state.register.os);
    const getOsNumber = useSelector((state) => state.register.osNumber);
    const getFullname = useSelector((state) => state.register.fullname);

    useEffect(() => {
        localStorage.setItem('userRegistered', props.match.params.ws); 
        let ws = localStorage.getItem('userRegistered'); 
        let dni = localStorage.getItem('userId'); 
        dispatch({type: 'REGISTER_FIRST_DNI', payload: dni})
        dispatch({type: 'REGISTER_FIRST_WS', payload: ws})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        localStorage.setItem('userRegistered', getWs); 
        localStorage.setItem('userId', getId); 
    }, [getWs, getId])

    const handleSignUp = async event => {
        dispatch({type: 'LOADING', payload: true})
        event.preventDefault()
        window.scroll(0,0)
        const { email, password } = event.target.elements;
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value)
                .then(reg => 
                    handleSubmit(reg.user.uid)
                )
                .catch(err => {
                    alert(err)
                    dispatch({type: 'LOADING', payload: false})
                })
        } catch (error) {
            alert(error)
        }
    }

    let composeDate = () => {
        let buildDate = new Date(getMonth + '/' + getDay + '/' + getYear);
        let birth = moment(buildDate).format('YYYY-MM-DD');
        let date = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        console.log('test');
        dispatch({type: 'REGISTER_FIRST_DOB', payload: birth})
        dispatch({type: 'REGISTER_FIRST_DT', payload: date})
    }
    
    let handleSubmit = (reg) => {
        dispatch({type: 'LOADING', payload: true})
        dispatch({type: 'REGISTER_FIRST_CORE', payload: reg})
        composeDate()
        dispatch({type: 'SET_STATUS', payload: 0})
        let getLocalWs = localStorage.getItem('userRegistered') 
        let dob = `${getYear}-${getMonth}-${getDay}`
        let data = {
            core_id: reg || '',
            dni: getId || '',
            sex: getSex || '',
            dob: dob || '',
            address: getAddress.concat(", " + getCity) || '',
            piso: getPiso || '',
            ws: getLocalWs || '',
            dt: getDate || '',
            corporate: getOs.concat(' ' + getOsNumber) || '',
            fullname: getFullname || '',
            email: getEmail || ''
        }
        let headers = { ContentType: 'Application/json' }
        axios.post(user_online, data, headers)
            .then((res) => {
                console.log(res)
                setTimeout(() => {
                    dispatch({type: 'SET_STATUS', payload: 99})
                    console.log(props.history);
                    props.history.push('/')
                    setTimeout(() => dispatch({type: 'LOADING', payload: false}), 1500)
                }, 2000)
            })
            .catch((err) => {
                console.log(err)
                setTimeout(() => {
                    dispatch({type: 'SET_STATUS', payload: 99})
                    props.history.push(`/`)
                    setTimeout(() => dispatch({type: 'LOADING', payload: false}), 1500)
                }, 2500)
            })    
    }

    return(
        <>
            {loading && <Loading />}
            <GenericHeader>Registro</GenericHeader>
            { modalDisplay ? 
                <MobileModal title="¡Registro exitoso!" hideCloseButton={true}>
                    <div className="contentData">¡Te registraste con éxito!</div>
                    <div className="buttonContainer">
                        <a href="/">
                        <button 
                            className="btn btn-active buttonSuccess">
                           Ir al inicio de la aplicación
                        </button>
                        </a>
                    </div>
                </MobileModal>
            : ''}
            <form className="registerWrapper register-form mt-2" onSubmit={(e) => handleSignUp(e)}>
                <div className="col-sm-12">
                    <label className="form-label mb-0" htmlFor="email">Email</label>
                    <input className="form-input" id="email" placeholder="Email" type="email" onChange={(e) => dispatch({type: 'REGISTER_FIRST_EMAIL', payload: e.target.value})} required/>
                    <label className="form-label mb-0 mt-2" htmlFor="password">Password</label>
                    <input className="form-input" name="password" type="password" placeholder="Password" required/>
                    <label className="form-label" htmlFor="name">Nombre y apellido</label>
                    <input className="form-input" id="name" placeholder="Nombre" required 
                        autoComplete="on" type="text" onChange={(e) => dispatch({type: 'REGISTER_FIRST_FULLNAME', payload: e.target.value})} />
                    <label className="form-label" htmlFor="dni">Número de documento</label>
                    <input className="form-input" id="dni" placeholder="DNI" value={getId || ''} required 
                        autoComplete="on" type="tel" onChange={(e) => dispatch({type: 'REGISTER_FIRST_DNI', payload: e.target.value})} />
                    <label className="form-label" htmlFor="ws">Número de whatsapp</label>
                    <input className="form-input" id="ws" placeholder="Whatsapp" value={getWs || ''} required 
                        autoComplete="on" type="tel" onChange={(e) => dispatch({type: 'REGISTER_FIRST_WS', payload: e.target.value})} />
                    <div className="d-flex justify-content-start">
                        <div className="birthContainer w-50">
                            <label className="form-label birthLabel">Fecha de nacimiento</label>
                            <div className="d-flex birthInputContainer">
                                <input className="form-mid-input mr-2" onChange={(e) => dispatch({type: 'REGISTER_FIRST_DAY', payload: e.target.value})} type="number" max="31" name="bday" required="required" id="dateDay" placeholder={getDay}/>
                                <input className="form-mid-input mr-2" onChange={(e) => dispatch({type: 'REGISTER_FIRST_MONTH', payload: e.target.value})} type="number" max="12" name="bMonth" required="required" id="dateMonth" placeholder={getMonth}/>
                                <input className="form-mid-input mr-2" onChange={(e) => dispatch({type: 'REGISTER_FIRST_YEAR', payload: e.target.value})} type="number" max="3000" name="bYear" required="required" id="dateYear" placeholder={getYear}/>
                            </div>
                        </div>
                        <div className="sexContainer w-50">
                            <label className="form-label sexLabel" htmlFor="gender">Sexo</label>
                            <select className="form-mid-input" style={{height: '65%'}} id="gender" onChange={(e) => dispatch({type: 'REGISTER_FIRST_SEX', payload: e.target.value})} required>
                                <option defaultValue>Sexo</option>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                            </select>
                        </div>
                    </div>
                    <label className="form-label addressLabel" htmlFor="city">Localidad</label>
                    <input className="form-input" id="city" placeholder="Localidad" required 
                        autoComplete="off" type="text" onChange={(e) => dispatch({type: 'REGISTER_FIRST_CITY', payload: e.target.value})} />
                    <label className="form-label addressLabel" htmlFor="address">Dirección</label>
                    <input className="form-input" id="address" placeholder="Dirección" required 
                        autoComplete="off" type="text" onChange={(e) => dispatch({type: 'REGISTER_FIRST_ADDRESS', payload: e.target.value})} />
                    <label className="form-label" htmlFor="dpto">Piso y Departamento</label>
                    <input className="form-input" id="dpto" placeholder="Piso/Depto"  
                        autoComplete="off" type="text" onChange={(e) => dispatch({type: 'REGISTER_FIRST_PISO', payload: e.target.value})} />
                    <label className="form-label" htmlFor="os">Obra social / Prepaga / Seguro</label>
                    <input className="form-input" id="os" placeholder="Obra social/Prepaga/Seguro" required 
                        autoComplete="off" type="text" onChange={(e) => dispatch({type: 'REGISTER_FIRST_OS', payload: e.target.value})}  />
                    <label className="form-label" htmlFor="osnumber">Número de Obra social, Prepaga o Seguro</label>
                    <input className="form-input" id="osnumber" placeholder="Obra social/Prepaga/Seguro"  
                        autoComplete="off" type="text" onChange={(e) => dispatch({type: 'REGISTER_FIRST_OS_NUMBER', payload: e.target.value})}  />
                </div>
                <div className="text-center">
                    <Link to="/terms"  target="_blank">
                        <small>Acepto los términos y condiciones de UMA</small>
                    </Link>
                </div>
                <div className="col-sm-12 text-right">
                    <button className="btn sendButtonStyles" type="submit">Enviar</button>
                </div>
                <div className="text-center link p-2 mt-2" onClick={() => props.history.push(`/login`)}>
                    Ya estoy registrado
                </div>
            </form>
        </>
    )
}

export default withRouter(UserNotFound);
