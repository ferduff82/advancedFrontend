import React from 'react';
import { useSelector } from "react-redux"
import Cab from './Cab';
import Vmd from './Vmd';
import Loading from '../components/global/Utilities/Loading'

const Provider = () => {
    const userData = useSelector(state => state.front.user)
    if (userData.rol === "ONLINE" || userData.rol === "VMD" || userData.rol === "MEDICO") {
        return <Vmd cuit={userData.cuit} service={userData.rol} />
    } else if (userData.rol === "REMIS") {
        return <Cab cuit={userData.cuit} service={userData.rol} />
    } else {
        return <Loading />
    }
}

export default Provider