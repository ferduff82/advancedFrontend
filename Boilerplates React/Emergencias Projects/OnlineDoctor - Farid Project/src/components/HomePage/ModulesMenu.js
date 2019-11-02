import React from 'react';
import {withRouter} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {GenericHeader} from '../GeneralComponents/Headers';
import { faLaptopMedical, faUserMd, faClinicMedical, faAmbulance, faBus, faUserNurse, faUserCog, faNotesMedical } from '@fortawesome/free-solid-svg-icons'
import WhenScreen from '../OnlineDoctor/WhenScreen/WhenAtt';
import Module from './Module';
import {ModulesMenuLang} from '../../langs/';

const ModulesMenu = (props) => {
    const [txt, setTxt] = React.useState(ModulesMenuLang)
    const whenScreen = useSelector((state) => state.front.dinamic.whenDinamic)
    const patient = useSelector((state) => state.queries.patient)

    return(
        <>
        {whenScreen ? <WhenScreen/> : ''}
        <GenericHeader>{patient.fullname}</GenericHeader>
        <div className="modules-container">
            <Module link={`/${props.ws}/profile`} styles="lighter-module" enabled={true}>
                <div className="module-ico"><FontAwesomeIcon icon={faUserCog} /></div>
                    <p className="module-title">{txt.profile}</p>
            </Module>
            <Module link={`/${props.ws}/history/`} styles="lighter-module" enabled={true}>
                <div className="module-ico"><FontAwesomeIcon icon={faNotesMedical} /></div>
                <p className="module-title">{txt.history}</p>
            </Module>
            <Module link={`/${props.ws}/onlinedoctor/when`} enabled={patient.service[0]}>
                <div className="module-ico">
                    <FontAwesomeIcon icon={faLaptopMedical} />
                </div>
                <p className="module-title">{txt.onlinedoctor}</p>
            </Module>
            <Module link={`/${props.ws}/transport`} enabled={patient.service[1]}>
                <div className="module-ico"><FontAwesomeIcon icon={faBus} /></div>
                    <p className="module-title">{txt.transfers}</p>
            </Module>
            <Module link={`/${props.ws}/`} enabled={patient.service[2]}>
                <div className="module-ico"><FontAwesomeIcon icon={faAmbulance} /></div>
                    <p className="module-title">{/* <a href='tel:0810-444-0911' className="module-name"> */}{txt.ambulance}{/* </a> */}</p>
            </Module>
            <Module link={`/${props.ws}/vmd`} enabled={patient.service[3]}>
                <div className="module-ico"><FontAwesomeIcon icon={faUserMd} /></div>
                    <p className="module-title">{txt.vmd}</p>
            </Module>
            <Module enabled={patient.service[4]}>
                {/* <a href={`https://appointments-70a07.firebaseapp.com/${patient.dni}/${props.ws}/`} ></a> */}
                    <div className="module-ico"><FontAwesomeIcon icon={faClinicMedical} /></div>
                    <p className="module-title">{txt.appointment}</p>
            </Module>
            <Module link={`/${props.ws}/`} enabled={patient.service[5]}>
                <div className="module-ico"><FontAwesomeIcon icon={faUserNurse} /></div>
                    <p className="module-title">{txt.homecare}</p>
            </Module>
        </div>
        </>
    )
}

export default withRouter(ModulesMenu)