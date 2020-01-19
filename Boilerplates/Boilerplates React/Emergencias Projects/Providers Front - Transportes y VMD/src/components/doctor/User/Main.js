import React, { useEffect, useState } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import { Link, Prompt, withRouter, Redirect } from 'react-router-dom'
import Axios from 'axios'
import Switch from 'react-switch'
import ValidateDoctor from './ValidateDoctor'
import PersonalData from './PersonalData'
import ProfessionalData from './ProfessionalData'
import HolidaysData from './HolidaysData'
import DayTime from './DayTime'
import UploadDocumentation from './UploadDocumentation'
import SuccessPost from './SuccessPost'
// import GetFaceEmbeddings from './FaceRecognition/GetFaceEmbeddings'
import { openDropdown } from '../../../store/actions/frontActions'
import { initialDaytime } from '../../../store/actions/daytimeActions'
import { checkEvent, validateService, validateSpecialty, setCheckProfessional } from '../../../store/actions/validateActions'
import firebase from "../../../config/DBConnection"
import ValidateProfessional from './validations/ValidateProfessional'
import ValidateDocumentation from './validations/ValidationsImageUpload'
import ValidateSubmit from './validations/ValidateSubmit'
import { expireEvent } from '../../../store/actions/uploadActions'
import { buildUploadImages } from '../../../store/actions/buildImagesPostObject'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import '../../../styles/doctor/user/Main.scss'


// window.addEventListener("beforeunload", function (e) {
//     e["returnValue"] = ""
// })

const RegisterMedic = (props) => {

    const tel = localStorage.getItem('userPhone')
    const cuil = localStorage.getItem('userCuil')
    const dispatch = useDispatch()
    const { isRegister, history } = props
    const [initialData, setInitialData] = useState()
    const [loadingSubmit, setLoadingSubmit] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [documents, setDocuments] = useState()
    const dropdownOpen = useSelector(state => state.front.dropdown.open)
    const cvData = useSelector(state => state.buildImages.cv.data.cv)
    const tituloData = useSelector(state => state.buildImages.titulo.data.titulo)
    const seguroData = useSelector(state => state.buildImages.seguro.data.seguro)
    const afipData = useSelector(state => state.buildImages.afip.data.afip)
    const signatureData = useSelector(state => state.buildImages.signature)
    const embedingsData = useSelector(state => state.buildImages.embedings)
    const matriculaData = useSelector(state => state.buildImages.matricula.data.matricula)
    const especialidadData = useSelector(state => state.buildImages.especialidad.data.especialidad)
    const certificadoLaboralData = useSelector(state => state.buildImages.certificado.data.certificado)
    const aeropuertoData = useSelector(state => state.buildImages.aeropuerto.data.aeropuerto)
    const checkData = useSelector(state => state.validate.checked.isChecked)
    const serviceData = useSelector(state => state.validate.isValidValue.data)
    const isServiceValid = useSelector(state => state.validate.isValidValue.isValid)
    const isMedicalVisitValid = useSelector(state => state.validate.medicalVisit)
    const isConsultoryValid = useSelector(state => state.validate.consultory)
    const isOnLineValid = useSelector(state => state.validate.onLine)
    const specialtyData = useSelector(state => state.validate.isSpecialtyValid.data)
    const dayTimeData = useSelector(state => state.daytimes.daytimeStatus.dayTimes)
    const holidaysData = useSelector(state => state.calendar.calendarDates.payload)
    const isDaytimeValid = useSelector(state => state.daytimes.daytimeStatus.isValid)
    const advancedValidation = useSelector(state => state.daytimes.daytimeStatus.advancedValidation)
    const expireSeguro = useSelector(state => state.upload.expireInsurance)
    const expireMatricula = useSelector(state => state.upload.expireMatricula)
    const password = useSelector(state => state.front.register.pass)
    // const typeOfUser = useSelector(state => state.front.register.type)

    const multipleInvalidTest = (advancedValidation, isDaytimeValid) => {
        var redValue = ''
        if (advancedValidation) {
            redValue = false
        } else if (!isDaytimeValid) {
            redValue = false
        } else {
            redValue = true
        }
        return redValue
    }

    useEffect(() => {
        Axios({ url: `https://providers-dot-uma-v2.appspot.com/provider/${tel}/${cuil}` })
            .then((response) => {
                setDocuments(response.data.provider.documents)
                console.log(response)
                setInitialData(response)
            })
            .catch((error) => {
                console.log(error)
            })
        // if (isRegister) {
        //     if (!password || !tel || !cuil || !typeOfUser) setRedirect(true)
        // }
    }, [])

    useEffect(() => {
        if (initialData) {
            dispatch(validateService(initialData.data.provider.rol))
            dispatch(setCheckProfessional(initialData.data.provider.services.vmd === 'true' ? false : true, 'medicalVisit'))
            dispatch(setCheckProfessional(initialData.data.provider.services.consultorio === 'true' ? false : true, 'consultory'))
            dispatch(setCheckProfessional(initialData.data.provider.services.online === 'true' ? false : true, 'onLine'))
            dispatch(validateSpecialty(initialData.data.provider.especialidad))
            /* Initial data Load Daytimes */
            dispatch(initialDaytime(initialData.data.provider.sheet))
        }
        /* Initial data Load Documentation */
        if (documents) {
            documents.cv && dispatch(buildUploadImages(documents.cv, 'cv'))
            documents.titulo && dispatch(buildUploadImages(documents.titulo, 'title'))
            documents.seguro && dispatch(buildUploadImages(documents.seguro, 'insurance'))
            documents.afip && dispatch(buildUploadImages(documents.afip, 'afip'))
            documents.matriculaData && dispatch(buildUploadImages(documents.matriculaData, 'matricula'))
            documents.especialidad && dispatch(buildUploadImages(documents.especialidad, 'especialidad'))
            documents.certificado && dispatch(buildUploadImages(documents.certificado, 'certificado'))
            documents.aeropuertoData && dispatch(buildUploadImages(documents.aeropuertoData, 'airport'))
            dispatch(expireEvent(initialData.data.provider.expireMatricula, 'expireMatricula'))
            dispatch(expireEvent(initialData.data.provider.expireSeguro, 'expireInsurance'))
        }
    }, [initialData])

    const submitData = isFormValid => {
        // console.log(embedingsData[0])

        if (!isFormValid) {
            let formData = new FormData()
            var dayTimeDataString = JSON.stringify(dayTimeData)
            var holidaysDataString = JSON.stringify(holidaysData)
            formData.set('serviceData', serviceData)
            formData.set('dayTimeData', dayTimeDataString)
            formData.set('holidaysData', holidaysDataString)
            /* Nuevas strings */
            formData.set('signatureData', signatureData)
            formData.set('face_landmarks', embedingsData[0])
            formData.set('expireSeguro', expireSeguro)
            formData.set('expireMatricula', expireMatricula)
            formData.set('specialtyData', specialtyData)
            formData.set('isMedicalVisitValid', isMedicalVisitValid)
            formData.set('isConsultoryValid', isConsultoryValid)
            formData.set('isOnLineValid', isOnLineValid)
            if (isEmpty(cvData) && typeof cvData === 'object') {
                formData.append('cvData', cvData)
            }
            if (isEmpty(tituloData) && typeof tituloData === 'object') {
                formData.append('tituloData', tituloData)
            }
            if (isEmpty(seguroData) && typeof seguroData === 'object') {
                formData.append('seguroData', seguroData)
            }
            if (isEmpty(afipData) && typeof afipData === 'object') {
                formData.append('afipData', afipData)
            }
            /* Nuevas imágenes */
            if (isEmpty(matriculaData) && typeof matriculaData === 'object') {
                formData.append('matriculaData', matriculaData)
            }
            if (isEmpty(especialidadData) && typeof especialidadData === 'object') {
                formData.append('especialidadData', especialidadData)
            }
            if (isEmpty(certificadoLaboralData) && typeof certificadoLaboralData === 'object') {
                formData.append('certificadoLaboralData', certificadoLaboralData)
            }
            if (isEmpty(aeropuertoData) && typeof aeropuertoData === 'object') {
                formData.append('aeropuertoData', aeropuertoData)
            }
            function isEmpty(obj) {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key))
                        return false
                } return true
            }
            setLoadingSubmit('loading')
            const config = { headers: { 'content-type': 'multipart/form-data' } }
            if (isRegister) {
                const emailGenerated = `${tel}@uma-health.com`
                firebase.auth().createUserWithEmailAndPassword(emailGenerated, password).then(res => {
                    formData = { ...formData, email: emailGenerated, core_id: res.user.uid }
                    Axios.post(`https://providers-dot-uma-v2.appspot.com/${cuil}/alta_submission`, formData, config)
                        .then((response) => {
                            setLoadingSubmit('success')
                            history.replace("/")
                        }).catch((error) => {
                            setLoadingSubmit('failed')
                            firebase.auth().currentUser.delete()
                                .then(res => console.log("Success deleting user"))
                                .catch((e) => console.log("no success in deleting user"))
                            history.replace(`${tel}/${cuil}/register`)
                        })
                }).catch(e => {
                    console.log("No se pudo registrar en firebase, error: " + e)
                    history.replace(`${tel}/${cuil}/register`)
                })
            } else {
                Axios.post(`https://providers-dot-uma-v2.appspot.com/${cuil}/alta_submission`, formData, config)
                    .then((response) => {
                        setLoadingSubmit('success')
                        history.replace("/")
                    }).catch((error) => {
                        setLoadingSubmit('failed')
                        history.replace("/")
                    })
            }
        }
    }

    if (redirect) {
        return <Redirect to={`/register`} />
    }
    if (loadingSubmit) {
        return (<SuccessPost dataSuccess={loadingSubmit} />)
    } else if (initialData) {
        const { data } = initialData
        console.log(data)
        var isFormValid = ValidateSubmit(props)
        return (
            <div className={"providerWrapper"}>
                {/* {!embedingsData && <ValidateDoctor />} */}
                {isRegister ?
                    <div className="titleOnboarding">Profesionales de la Salud</div>
                    :
                    <div className="titleOnboarding">
                        <span className="back-arrow" onClick={() => props.history.push("/")}> <FontAwesomeIcon icon={faArrowLeft} /> </span>
                        Profesional de la Salud
                    </div>
                }
                <div className="listsWrapper d-flex justify-content-center">
                    <div onClick={() => dispatch(openDropdown('personalData'))}
                        className="dropdownButton alert alert-primary"
                        data-active={(dropdownOpen === 'personalData') ? 'true' : 'false'}>
                        <span><i className="fas fa-user"></i></span>
                    </div>
                    <div onClick={() => dispatch(openDropdown('professionalData'))}
                        className={isServiceValid && !ValidateProfessional(props) ? 'dropdownButton alert alert-primary' : 'dropdownButton alert red alert-primary'}
                        data-active={(dropdownOpen === 'professionalData') ? 'true' : 'false'}>
                        <span><i className="fas fa-stethoscope"></i></span>
                    </div>
                    <div onClick={() => dispatch(openDropdown('timeData'))}
                        data-active={(dropdownOpen === 'timeData') ? 'true' : 'false'}
                        className={multipleInvalidTest(advancedValidation, isDaytimeValid) ? 'dropdownButton alert alert-primary' : 'dropdownButton alert red alert-primary'}>
                        <span><i className="fas fa-clock"></i></span>
                    </div>
                    <div onClick={() => dispatch(openDropdown('holidaysData'))}
                        data-active={(dropdownOpen === 'holidaysData') ? 'true' : 'false'}
                        className="dropdownButton alert alert-primary">
                        <span><i className="fas fa-calendar-alt"></i></span>
                    </div>
                    <div onClick={() => dispatch(openDropdown('documentData'))}
                        data-active={(dropdownOpen === 'documentData') ? 'true' : 'false'}
                        className={!ValidateDocumentation(props) ? 'dropdownButton alert alert-primary' : 'dropdownButton alert red alert-primary'}>
                        <span><i className="fas fa-id-card"></i></span>
                    </div>
                </div>
                <ul>
                    <li>{(dropdownOpen === 'personalData') && <PersonalData dataInfo={data} />}</li>
                    <li>{(dropdownOpen === 'professionalData') && <ProfessionalData dataInfo={data} />}</li>
                    <li>{(dropdownOpen === 'timeData') && <div className="dropdownContent"><DayTime dataInfo={data} /></div>}</li>
                    <li>{(dropdownOpen === 'holidaysData') && <div className="dropdownContent"><HolidaysData dataInfo={data} /></div>}</li>
                    <li>{(dropdownOpen === 'documentData') && <div className="dropdownContent"><UploadDocumentation dataInfo={data} /></div>}</li>
                    <li className="footerSubmit">
                        <div className="validateAndWrapper">
                            <div className="errorHelper">
                                {multipleInvalidTest(advancedValidation, isDaytimeValid) ?
                                    '' : 'Hay un error al completar los horarios de trabajo *'
                                }
                            </div>
                            <div className={isRegister ? "termsAndConditions" : "termsAndConditions invisible"}>
                                <label className="d-flex justify-content-center">
                                    <div className="acceptTerms">
                                        <Link to="/index/terms" target="_blank">Aceptar términos y condiciones</Link>
                                        <span>{checkData ? '' : '*'}</span>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <Switch type="checkbox"
                                            className="custom-control-input"
                                            id="customCheck"
                                            checked={isRegister ? checkData : true}
                                            name="example1"
                                            onChange={() => dispatch(checkEvent(checkData))} />
                                        <label className="custom-control-label" htmlFor="customCheck"></label>
                                    </div>
                                </label>
                            </div>
                            <div className="sendContainer">
                                <button className="btn btn-active sendButton"
                                    disabled={isFormValid}
                                    onClick={() => submitData(isFormValid)}>
                                    {isRegister ? "Enviar" : "Guardar"}
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    } else {
        return (
            <div>
                <div className="loading spinner-border text-primary" role="initial">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
}

export default withRouter(RegisterMedic)
