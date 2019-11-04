import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom';
import {GenericHeader} from '../GeneralComponents/Headers';
import DossierContainer from './DossierContainer'
import { getVoucherById } from '../../store/actions/firebaseQueries';

const Record = (props) => {
    const dispatch = useDispatch()
    const att = useSelector((state) => state.queries.voucher)
    const [tab, setTab] = useState(true)

    useEffect(() => {
        let u = JSON.parse(localStorage.getItem('userData'))
        console.log("With get Voucher", u.dni, props.aid)
        dispatch(getVoucherById(u.dni, props.aid)) 
    }, [dispatch, props.aid])

    useEffect(() =>{
        document.addEventListener("keydown", (e) => {
            if (e.key === 'Escape') {
               dispatch({type: 'DOSSIER_MODAL', payload: false})
            }
        })
    })

    useEffect(() => {
        if(att[0]) {
            console.log(att[0].provider.cuit)
        }
        console.log("ATT RECORD", att, props.aid)
    }, [att])

    function goHomeScreen() {
        props.history.push('/')
    }

    return(
        <>
        <div>
            <GenericHeader>Datos de su consulta</GenericHeader>
        </div>
        <div className="text-center tab-container">
            <button className={ tab ? "active btn btn-secondary" : "btn btn-secondary" } onClick={() => setTab(true)}>Resumen</button>
            <button className={ !tab ? "active btn btn-secondary" : "btn btn-secondary" } onClick={() => setTab(false)}>Constancia</button>
        </div>
        {att.assignation_id ? 
        <>
            <DossierContainer att={att} tab={tab} />
        </>
            :
        <div className="p-3 text-center">El Médico aún no completó la ficha de su consulta o se está cargando. Estará disponible en breve.</div>
        }
            <div className="btn btn-blue-lg" onClick={() => goHomeScreen()}>Continuar</div>
        </>
    )
}

export default withRouter(Record);