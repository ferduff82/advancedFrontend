
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Switch from 'react-switch'
import { validateService, validateSpecialty, setCheckProfessional } from '../../../store/actions/validateActions'
import "../../../styles/doctor/user/ProfessionalData.scss"


const ProfessionalData = (props) => {
    const getSpecialtyValue = useSelector(state => state.validate.isSpecialtyValid.data)
    const getRolValue = useSelector(state => state.validate.isValidValue.data)
    const isServiceValid = useSelector(state => state.validate.isValidValue.isValid)
    const isMedicalVisitValid = useSelector(state => state.validate.medicalVisit)
    const isConsultoryValid = useSelector(state => state.validate.consultory)
    const isOnLineValid = useSelector(state => state.validate.onLine)
    const dispatch = useDispatch()
    const { dataInfo } = props

    const validateAllServices = () => {
        if (isMedicalVisitValid || isConsultoryValid || isOnLineValid) {
            return false;
        } else {
            return true;
        }
    }

    if (dataInfo) {
        const { matriculas } = dataInfo.provider;

        let filterCABA = Object.values(matriculas).filter(function (item) {
            return item.jurisdiccion === "CABA";
        })
        let notCABA = Object.values(matriculas).filter(function (item) {
            return item.jurisdiccion !== "CABA";
        })

        return (
            <div className="professionalDataWrapper">
                <div className="d-flex list-container">
                    <div className="matricula"><strong>Matricula:</strong></div>
                    <div className="matriculaData">
                        {filterCABA.length > 0 ? filterCABA[0].matricula : ''}
                    </div>
                </div>
                <div className="d-flex list-container">
                    <div className="jurisdiccion">
                        <strong>Jurisdicción:</strong>
                    </div>
                    <div className="jurisdiccionData">
                        {filterCABA.length > 0 ? filterCABA[0].jurisdiccion : ''}
                    </div>
                </div>
                <div className="d-flex list-container">
                    <div className="otros"><strong>Otros:</strong></div>
                    <div className="otrosData">
                        <table>
                            <tbody>
                                <tr><td>Matricula</td><td>Jurisdicción</td></tr>
                                {notCABA.length > 0 ? notCABA.map((item, index) =>
                                    <tr key={index} className="dataOtros">
                                        <td>{item.matricula} </td><td> {item.jurisdiccion}</td>
                                    </tr>
                                ) : <tr></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="d-flex list-container">
                    <div className="servicios"><strong>Rol:</strong></div>
                    <div className="serviciosData">
                        <select className="form-control"
                            defaultValue={getRolValue ? getRolValue : 'select'}
                            onChange={(e) => dispatch(validateService(e.target.value))}>
                            <option value="select" disabled>Seleccionar rol</option>
                            <option value="MEDICO">MEDICO</option>
                            <option value="ENFERMERO">ENFERMERO</option>
                            <option value="CUIDADOR/CAMILLERO/CELADOR">CUIDADOR/CAMILLERO/CELADOR</option>
                            <option value="KINESIOLOGO">KINESIOLOGO</option>
                            <option value="NUTRICIONISTA">NUTRICIONISTA</option>
                            <option value="ONLINE">ONLINE</option>
                            <option value="PSICOLOGO">PSICOLOGO</option>
                        </select>
                        <div className="mandatoryFill">
                            {isServiceValid ? '' : 'El campo no puede estar vacío *'}
                        </div>
                    </div>
                </div>
                {getRolValue === 'MEDICO' ?
                    <div className="d-flex list-container">
                        <div className="servicios"><strong>Especialidad:</strong></div>
                        <div className="serviciosData">
                            <select className="form-control"
                                defaultValue={getSpecialtyValue ? getSpecialtyValue : 'select'}
                                onChange={(e) => dispatch(validateSpecialty(e.target.value))}>
                                <option value="select" disabled>Especialidad</option>
                                <option value="MEDICO-GENERALISTA-(SIN ESPECIALISTA)">Medico Generalista (sin especialista)</option>
                                <option value="JOVEN-PROFESIONAL">Joven Profesional</option>
                                <option value="PEDIATRA">Pediatra</option>
                                <option value="FAMILIA">Familia</option>
                                <option value="CLINICO">Clinico</option>
                                <option value="CARDIOLOGO">Cardiologo</option>
                                <option value="DERMATOLOGO">Dermatologo</option>
                                <option value="DIABETOLOGO">Diabetologo</option>
                                <option value="ENDOCRINOLOGO">Endocrinologo</option>
                                <option value="FLEBOLOGO">Flebologo</option>
                                <option value="FONOAUDILOGO">Fonoaudilogo</option>
                                <option value="GASTROENTEROLOGO">Gastroenterologo</option>
                                <option value="GINECOLOGO">Ginecologo</option>
                                <option value="HEMATOLOGO">Hematologo</option>
                                <option value="NEFROLOGO">Nefrologo</option>
                                <option value="NEUMOLOGO">Neumologo</option>
                                <option value="NEUROLOGO">Neurologo</option>
                                <option value="OFTALMOLOGO">Oftalmologo</option>
                                <option value="OTORRINO">Otorrino</option>
                                <option value="PEDIATRA">Pediatra</option>
                                <option value="TRAUMATOLO">Traumatolo</option>
                                <option value="UROLOGO">Urologo</option>
                            </select>
                            <div className="mandatoryFill">
                                {isServiceValid ? '' : 'El campo no puede estar vacío *'}
                            </div>
                        </div>
                    </div>
                    : ''}
                <div className="d-flex list-container">
                    <div className="servicios d-flex justify-content-between">
                        <strong>Seleccionar servicios a brindar</strong>
                        {validateAllServices() ?
                            <div className="mandatory">* Obligatorio</div>
                            : ''}
                    </div>
                </div>
                <div className="d-flex list-container">
                    <div className="servicios"><strong>Visita médica:</strong></div>
                    <div className="serviciosData">
                        <Switch type="checkbox"
                            id="medicalVisit"
                            checked={isMedicalVisitValid}
                            name="medicalVisit"
                            onChange={(e) => dispatch(setCheckProfessional(isMedicalVisitValid, 'medicalVisit'))} />
                    </div>
                </div>
                <div className="d-flex list-container">
                    <div className="servicios"><strong>Consultorio:</strong></div>
                    <div className="serviciosData">
                        <Switch type="checkbox"
                            id="consultory"
                            checked={isConsultoryValid}
                            name="consultory"
                            onChange={(e) => dispatch(setCheckProfessional(isConsultoryValid, 'consultory'))} />
                    </div>
                </div>
                <div className="d-flex list-container">
                    <div className="servicios"><strong>Online:</strong></div>
                    <div className="serviciosData">
                        <Switch type="checkbox"
                            id="online"
                            checked={isOnLineValid}
                            name="online"
                            onChange={(e) => dispatch(setCheckProfessional(isOnLineValid, 'onLine'))} />
                    </div>
                </div>
            </div>
        )
    }
}
export default ProfessionalData
