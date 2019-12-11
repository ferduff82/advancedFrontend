import React from 'react';
import { Header } from '../../components/vmd-medics/GeneralComponents/Header';
import TravelList from '../../components/vmd-medics/TravelList/TravelList';

const Cab = (props) => {
    return (
        <>
            <Header title={props.service}>
                Viaje actual
            </Header>
            <TravelList cuit={props.user} />
        </>
    )
}

export default Cab