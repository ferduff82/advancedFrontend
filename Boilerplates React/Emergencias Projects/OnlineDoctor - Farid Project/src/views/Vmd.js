import React from 'react';
import {GenericHeader} from '../components/GeneralComponents/Headers';
import Vmd from '../components/VMD';


const VMD = (props) => {

    return(
       <>
        <GenericHeader onClick={() => {props.history.go(`/${props.match.params.dni}/`)}}>Visita Médica Domiciliaria</GenericHeader>
        <Vmd />
       </>
    )
}

export default VMD