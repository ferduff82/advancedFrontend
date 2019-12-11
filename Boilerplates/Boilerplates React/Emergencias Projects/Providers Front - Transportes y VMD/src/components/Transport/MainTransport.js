
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import Axios from 'axios';
import Switch from 'react-switch';
import PersonalData from '../transportist/transfers/PersonalData';
import ProfessionalData from '../transportist/transfers/ProfessionalData';
import UploadDocumentation from '../transportist/transfers/UploadDocumentation';
import SuccessPost from '../transportist/transfers/SuccessPost';
import Validations from '../transportist/transfers/validations/Validations';
import Wizard from '../transportist/transfers/Wizard';
import BuildFormData from '../global/Utilities/BuildFormData';
import ValidateGeolocation from '../global/ValidateGeolocation';
import DaytimeData from '../global/Daytime';
import Loading from '../global/Utilities/Loading';
import { openDropdown } from '../../store/actions/frontActions';
import { initialDaytime } from '../../store/actions/daytimeActions';
import { checkEvent } from '../../store/actions/validateActions';
import { triggerCelador, inputProfessionals } from '../../store/actions/transport/profesionalsActions';
import firebase from "../../config/DBConnection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import '../../styles/transport/Main.scss';

const Main = (props) => {
    const [initialData, setInitialData] = useState()
    const [loadingSubmit, setLoadingSubmit] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [vehicleData, setVehicleData] = useState(null)
    const [allDaytimes, setAllDaytimes] = useState(null)
    const tel = localStorage.getItem('userPhone')
    const cuil = localStorage.getItem('userCuil')
    const dropdownOpen = useSelector(state => state.front.dropdown.open)
    const checkData = useSelector(state => state.validate.checked.isChecked)
    // const tipoDeVehiculoProfessional = useSelector(state => state.professionalsData.tipoDeVehiculo)
    // const holidaysData = useSelector(state => state.calendar.calendarDates.payload)
    const numeroPlazasProfessional = useSelector(state => state.professionalsData.numeroPlazas)
    const patenteProfessional = useSelector(state => state.professionalsData.patente)
    const vehiculoProfessional = useSelector(state => state.professionalsData.vehiculo)
    const isDaytimeValid = useSelector(state => state.daytimes.daytimeStatus.isValid)
    const advancedDaytimeValidation = useSelector(state => state.daytimes.daytimeStatus.advancedValidation)
    const password = useSelector(state => state.front.register.pass)
    const type = useSelector(state => state.front.register.type)
    const dispatch = useDispatch()
    const { isRegister } = props;

    useEffect(() => {
        Axios({ url: `https://providers-dot-uma-v2.appspot.com/provider/${tel}/${cuil}` })
            .then(function (response) {
                console.log(response)
                setInitialData(response)
                setVehicleData(response.data.provider.vehicle)
                setAllDaytimes(response.data.provider.sheet)
            })
            .catch(function (error) {
                console.log(error);
            });
        // if (isRegister) {
        //     if (!password || !tel || !cuil || !type) setRedirect(true)
        // }

    }, [])

    useEffect(() => {
        if (vehicleData) {
            inputProfessionals('TRIGGER_TIPO_VEHICULO', vehicleData.type)
            inputProfessionals('TRIGGER_NUMERO_PLAZAS', vehicleData.n_plazas)
            inputProfessionals('TRIGGER_SILLA', (vehicleData.silla_de_ruedas === 'true' ? JSON.parse('true') : JSON.parse('false')))
            inputProfessionals('TRIGGER_RAMPA', (vehicleData.rampa === 'true' ? JSON.parse('true') : JSON.parse('false')))
            inputProfessionals('TRIGGER_PATENTE', vehicleData.patente)
            inputProfessionals('TRIGGER_VEHICULO', vehicleData.model)
            triggerCelador((vehicleData.celador === 'true' ? JSON.parse('true') : JSON.parse('false')))
            initialDaytime(allDaytimes);
        }
    }, [vehicleData])

    const submitData = () => {
        let formDataBuilt = BuildFormData()
        setLoadingSubmit("loading")
        const config = { headers: { 'content-type': 'multipart/form-data' } };
        if (isRegister) {
            const emailGenerated = `${tel}@uma-health.com`;
            firebase.auth().createUserWithEmailAndPassword(emailGenerated, password).then(res => {
                formDataBuilt = { ...formDataBuilt, email: emailGenerated, core_id: res.user.uid };
                Axios.post(`https://providers-dot-uma-v2.appspot.com/${cuil}/alta_submission`, formDataBuilt, config)
                    .then((response) => {
                        setLoadingSubmit("success")
                        props.history.replace("/")
                    }).catch((error) => {
                        setLoadingSubmit("failed")
                        firebase.auth().currentUser.delete()
                            .then(res => console.log("Success deleting user"))
                            .catch((e) => console.log("no success in deleting user"));
                        props.history.replace(`${tel}/${cuil}/register`)
                    });
            }).catch(e => {
                console.log("No se pudo registrar en firebase, error: " + e)
                props.history.replace(`${tel}/${cuil}/register`)
            })
        } else {
            Axios.post(`https://providers-dot-uma-v2.appspot.com/${cuil}/alta_submission`, formDataBuilt, config)
                .then((response) => {
                    setLoadingSubmit("success")
                    props.history.replace("/")
                }).catch((error) => {
                    setLoadingSubmit("failed")
                    props.history.replace(`/`)
                });
        }
    }

    // const multipleInvalidTest = (advancedValidation, isDaytimeValid) => {
    //     let redValue = '';
    //     if (advancedValidation) {
    //         redValue = 'dropdownButton alert red alert-primary';
    //     } else if (!isDaytimeValid) {
    //         redValue = 'dropdownButton alert red alert-primary';
    //     } else {
    //         redValue = 'dropdownButton alert alert-primary';
    //     }
    //     return redValue;
    // }

    if (redirect) {
        return <Redirect to={`/register`} />;
    }
    if (loadingSubmit) {
        return (
            <SuccessPost dataSuccess={loadingSubmit} />
        )
    } else if (initialData) {
        var validateSending = true
        var isFormValid = Validations(patenteProfessional, numeroPlazasProfessional, vehiculoProfessional)
        if (checkData === true &&
            isFormValid === true &&
            isDaytimeValid &&
            !advancedDaytimeValidation) {
            validateSending = false;
        }
        if (!initialData.data.provider.vehicle) {
            return (
                <div className="p-4 text-center">
                    Esta App solo es válida para Transportistas
                </div>
            )
        } else {
            return (
                <div className="providerWrapper">
                    {!initialData.data.provider.vehicle.patente ?
                        <div>
                            <Wizard dataInfo={initialData} />
                        </div>
                        :
                        <div>
                            <ValidateGeolocation />
                            {isRegister ?
                                <div className="titleOnboarding">Transportistas</div>
                                :
                                <div className="titleOnboarding">
                                    <span className="back-arrow" onClick={() => props.history.push("/")}> <FontAwesomeIcon icon={faArrowLeft} /> </span>
                                    Profesional de la Salud
                                </div>
                            }
                            <div className="listsWrapper d-flex justify-content-center">
                                <div onClick={() => openDropdown('personalData')}
                                    className="dropdownButton alert alert-primary"
                                    data-active={(dropdownOpen === 'personalData') ? 'true' : 'false'}>
                                    <span><i className="fas fa-user-circle"></i></span>
                                </div>
                                <div onClick={() => openDropdown('professionalData')}
                                    className={isFormValid ? 'dropdownButton alert alert-primary' : 'dropdownButton alert red alert-primary'}
                                    data-active={(dropdownOpen === 'professionalData') ? 'true' : 'false'}>
                                    <span><i className="fas fa-file-alt"></i></span>
                                </div>
                                <div onClick={() => openDropdown('dayTimeData')}
                                    className={isDaytimeValid && !advancedDaytimeValidation ? 'dropdownButton alert alert-primary' : 'dropdownButton alert red alert-primary'}
                                    data-active={(dropdownOpen === 'dayTimeData') ? 'true' : 'false'}>
                                    <span><i className="fas fa-clock"></i></span>
                                </div>
                                <div onClick={() => openDropdown('documentData')}
                                    data-active={(dropdownOpen === 'documentData') ? 'true' : 'false'}
                                    className="dropdownButton alert alert-primary">
                                    <span><i className="fas fa-address-card"></i></span>
                                </div>
                            </div>
                            <ul>
                                <li>
                                    {(dropdownOpen === 'personalData') && <PersonalData dataInfo={initialData} />}
                                </li>
                                <li>
                                    {(dropdownOpen === 'professionalData') && <ProfessionalData dataInfo={initialData} />}
                                </li>
                                <li>
                                    {(dropdownOpen === 'dayTimeData') && <DaytimeData />}
                                </li>
                                <li>
                                    {(dropdownOpen === 'documentData') && <UploadDocumentation dataInfo={initialData} />}
                                </li>
                                <li>
                                    {(dropdownOpen !== 'personalData') &&
                                        <div className="validateAndWrapper">
                                            <div className="termsAndConditions">
                                                <label className="d-flex justify-content-center">
                                                    <div className="acceptTerms">Aceptar términos y condiciones <span>{checkData ? '' : '*'}</span></div>
                                                    <div className="custom-control custom-checkbox mb-1 ml-2 mr-3">
                                                        <Switch type="checkbox"
                                                            id="customCheck"
                                                            name="example1"
                                                            checked={checkData}
                                                            onChange={() => dispatch(checkEvent(checkData))} />
                                                        <label className="custom-control-label" htmlFor="customCheck"></label>
                                                    </div>
                                                </label>
                                            </div>
                                            <div className="sendContainer">
                                                <button className="btn btn-active sendButton"
                                                    disabled={validateSending}
                                                    onClick={() => submitData()}>
                                                    Editar datos
                                                    </button>
                                            </div>
                                        </div>
                                    }
                                </li>
                            </ul>
                        </div>
                    }
                </div>
            )
        }
    } else {
        return (
            <Loading />
        )
    }






}

export default withRouter(Main);
