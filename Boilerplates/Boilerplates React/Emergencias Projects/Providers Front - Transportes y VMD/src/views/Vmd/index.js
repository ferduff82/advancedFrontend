import React from 'react';
import { Header } from '../../components/vmd-medics/GeneralComponents/Header';
import AttList from '../../components/vmd-medics/AttList/AttList';
import Version from '../../components/vmd-medics/GeneralComponents/Version';

const CurrentAtt = (props) => {
    return (
        <>
            <Header title={props.service}>
                Atención actual
            </Header>
            <AttList cuit={props.cuit} />
            <Version />
        </>
    )
}

export default CurrentAtt