
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {GenericHeader} from '../Headers';
import '../../../styles/generalcomponents/TransportOnboardingSecondStep.scss';

const TransportOnboarding = (props) => {

    const dispatch = useDispatch();
    const getDisability = useSelector((state) => state.onboardingSecondStep.disability);
    const getCertificate = useSelector((state) => state.onboardingSecondStep.certificateNumber);
    const getWheelChair = useSelector((state) => state.onboardingSecondStep.wheelChair);
    const getDiagnostic = useSelector((state) => state.onboardingSecondStep.diagnostic);
    const getProtection = useSelector((state) => state.onboardingSecondStep.protection);
    const getCompanionName = useSelector((state) => state.onboardingSecondStep.companionName);

    function goToNextStep() {
        dispatch({type: 'SET_PAGINATION_TRANSPORT', payload: 2})
    }

    return (
        <>
            <GenericHeader>Registro - Paso 2</GenericHeader>
            <div className="transportOnboardingSecondStep">
                <div className="secondStepContainer">
                    <form onSubmit={() => goToNextStep()}>
                        <div className="disabilityTitleWrapper d-flex justify-content-between">
                            <div className="titleSecondStep">Discapacidad</div>
                            {getDisability ? '' : <div className="mandatory">Obligatorio *</div> }
                        </div>
                        <select className="form-control" 
                            value={getDisability ? getDisability : ''} 
                            onChange={(e) => dispatch({type: 'ADD_DISABILITY', payload: e.target.value})} 
                            required>
                            <option value="">Sin informar</option> 
                            <option value="0-NINGUNA">0-NINGUNA</option> 
                            <option value="1-ESCASA">1-ESCASA</option>
                            <option value="2-MODERADA">2-MODERADA</option>
                            <option value="3-GRAVE">3-GRAVE</option>
                            <option value="4-TOTAL">4-TOTAL</option>
                        </select>

                        {getDisability !== "0-NINGUNA" ? 
                            <div>
                                <div className="titleSecondStep">Número de certificado</div>
                                <input type="text" 
                                    placeholder={'Ingresar certificado'}
                                    value={getCertificate ? getCertificate : ''} 
                                    onChange={(e) => dispatch({type: 'ADD_CERTIFICATE', payload: e.target.value})} 
                                    autoComplete="off" 
                                    id="certificate" 
                                    className="form-control" 
                                    required/>
                                <div className="titleSecondStep">Silla de ruedas</div>
                                <select className="form-control" 
                                    value={getWheelChair === "1" ? getWheelChair : '0'} 
                                    onChange={(e) => dispatch({type: 'ADD_WHEELCHAIR', payload: e.target.value})}>
                                    <option value="0">Sin informar</option> 
                                    <option value="0">NO</option> 
                                    <option value="1">SI</option>
                                </select>
                                <div className="titleSecondStep">Diagnóstico</div>
                                <select className="form-control"
                                    value={getDiagnostic ? getDiagnostic : ''} 
                                    onChange={(e) => dispatch({type: 'ADD_DIAGNOSTIC', payload: e.target.value})}>
                                    <option value="">Sin informar</option> 
                                    <option value="1-DISCAPACIDAD FISICA">1-DISCAPACIDAD FISICA</option> 
                                    <option value="2-DISCAPACIDAD SENSORIAL">2-DISCAPACIDAD SENSORIAL</option> 
                                    <option value="4-DISCAPACIDAD PSIQUICA">4-DISCAPACIDAD PSIQUICA</option> 
                                    <option value="5-DISCAPACIDAD VISCERAL">5-DISCAPACIDAD VISCERAL</option> 
                                    <option value="6-DISCAPACIDAD MULTIPLE">6-DISCAPACIDAD MULTIPLE</option> 
                                </select>
                                <div className="titleSecondStep">Amparo</div>
                                <select className="form-control"
                                    value={getProtection === "1" ? getProtection : '0'} 
                                    onChange={(e) => dispatch({type: 'ADD_PROTECTION', payload: e.target.value})}>
                                    <option value="0">Sin informar</option> 
                                    <option value="0">NO</option> 
                                    <option value="1">SI</option>
                                </select>
                                <div className="titleSecondStep">Nombre del acompañante</div>
                                <input type="text" 
                                    className="form-control"
                                    placeholder={'Ingresar acompañante'}
                                    value={getCompanionName} 
                                    onChange={(e) => dispatch({type: 'ADD_COMPANION', payload: e.target.value})}/>
                            </div>
                        : ''}
                        <div className="buttonsContainer">
                            <div className="buttonContainer">
                                <button 
                                    className="btn btn-active" 
                                    type="submit"
                                    disabled={!getDisability}>
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    ) 
}

export default TransportOnboarding;
