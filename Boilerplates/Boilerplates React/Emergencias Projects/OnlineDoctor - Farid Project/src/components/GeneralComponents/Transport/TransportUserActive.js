
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory, faCarAlt } from '@fortawesome/free-solid-svg-icons'
import {GenericHeader} from '../Headers';
import DisplayTrips from './DisplayTrips';

import '../../../styles/generalcomponents/TransportUserActive.scss';

const TransportUserActive = (props) => {

    const [tripS, setTripStatus] = useState('trasladosFuturos');
    const cancelTripComments = useSelector((state) => state.userActive.cancelTripComments);

    return (
        <div className="wrapperUserActive">
            <GenericHeader>Mis Traslados</GenericHeader>
            <div className="transportUserActive">
                <div className="optionsDisplay d-flex justify-content-center">
                    <div 
                        className={tripS === 'trasladosFuturos' ? 'trasladosFuturos active' : 'trasladosFuturos' } 
                        onClick={() => setTripStatus('trasladosFuturos')}>
                            <FontAwesomeIcon icon={faCarAlt}/>
                    </div>
                    <div
                        className={tripS === 'historial' ? 'historial active' : 'historial' } 
                        onClick={() => setTripStatus('historial')}>
                            <FontAwesomeIcon icon={faHistory}/>
                    </div>
                </div>
                <DisplayTrips tripStatus={tripS}/>
            </div>
        </div>
    )
}

export default TransportUserActive;
