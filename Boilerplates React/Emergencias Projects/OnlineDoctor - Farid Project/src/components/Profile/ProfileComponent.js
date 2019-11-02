import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {getAuth} from '../../store/actions/firebaseQueries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import {GenericHeader} from '../GeneralComponents/Headers';
import MobileModal from '../GeneralComponents/Modal/MobileModal';
import {PersonalData, ContactData, HealtData, ProfilePic} from './ProfileForms';
import Version from '../GeneralComponents/Version';

const ProfileComponent = (props) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.queries.patient)
    const modal = useSelector(state => state.front.openDetails)
    const section = useSelector(state => state.front.section)
    // const [lang, setLang] = React.useState("es")

    useEffect(() => {
        if(Object.entries(user).length === 0 && user.constructor === Object) {
            if(!JSON.parse(localStorage.getItem('userData')).ws) {
                getAuth(props.match.params.ws)
                    .then(u => {
                        dispatch({type: 'GET_PATIENT', payload: u})
                    })
                    .catch(e => console.log(e))
            } else {
                dispatch({type: 'GET_PATIENT', payload: JSON.parse(localStorage.getItem('userData'))})
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, props.match.params.ws])

    const EditButton = (props) => {
        return <FontAwesomeIcon icon={faPencilAlt} className="profile-edit" 
                    onClick={() => {
                        dispatch({type: 'EDIT_SECTION', payload: props.section})
                        dispatch({type: 'TOGGLE_DETAIL'})
                    }} />
    }

    const EditSection = () => {
        if(section === "personal") {
            return <PersonalData data={user} />
        } else if (section === "contact") {
            return <ContactData data={user} />
        } else if (section === "health") {
            return <HealtData data={user}/>
        } else if(section === "pic") {
            return <ProfilePic data={user}/>
        } else{
            return "Esta sección aún no se encuentra disponible"
        }
    }
        
    // function setLanguage(l) {
    //     ModulesMenuLang.setLanguage(l)
    //     setLang(ModulesMenuLang.getLanguage())
    //     setTxt(ModulesMenuLang)
    // }


    return (
        <>
           <GenericHeader>Perfil</GenericHeader>
           {modal &&
            <MobileModal title="Editar datos">
               <EditSection />
           </MobileModal>}
            <div className="profile-container">
                <div className="d-flex">
                    <div className="profile-photo section flex-shrink-0">
                        <FontAwesomeIcon icon={faUser} className="profile-nophoto" />
                        {/* <EditButton section="pic" /> */}
                    </div>
                    <div className="profile-info section flex-fill">
                        {/* <EditButton section="personal" /> */}
                        <p><b>{user.fullname}</b></p>
                        <p>{user.dni}</p>
                        <p>{user.corporate}</p> 
                        <p>{user.dob}</p>
                {/* <div className="d-flex justify-content-between">
                        <div className="lang-text" onClick={() => setLanguage("es")}> <p className="module-title">{txt.es}</p></div>
                        <div className="lang-text" onClick={() => setLanguage("en")}> <p className="module-title">{txt.en}</p></div>
                        <div className="lang-text" onClick={() => setLanguage("pt")}> <p className="module-title">{txt.pt}</p></div>
                    </div> */}
                    </div>
                </div>
                <hr />
                <div className="section">
                   {/*  <EditButton section="contact" /> */}
                    <p className="profile-section-title">Datos de contacto</p>
                    <p><b>Email: </b>{user.email}</p>
                    <p><b>Teléfono: </b>{user.ws}</p>
                    <p><b>Dirección: </b>{user.address}</p>
                </div>
                <hr />
{/*                 <div className="section">
                    <EditButton section="health" />
                    <p className="profile-section-title">Salud</p>
                    <p><b>Peso:</b> 74 kg</p>
                    <p><b>Altura:</b> 183 cms</p>
                    <p><b>Crónicos: </b>Diabetes</p>
                    <p><b>Antecedentes familiares: </b>Coronarios</p>
                </div>
                <hr />
                <div className="section">
                    <EditButton section="transfer" />
                    <p className="profile-section-title">Datos de traslado</p>
                    <p><b>Discapacidad:</b> Total (Visceral) </p>
                    <p><b>Certificado:</b> 123456</p>
                    <p><b>Silla de ruedas: </b>Si (Plegable)</p>
                    <p><b>Amparo:</b> Si</p>
                    <p><b>Acompañante:</b> Fernando</p>
                </div> */}
                <button className="btn btn-blue-lg" onClick={() => {props.history.push('/')}}>Volver</button>
                <div className="text-center">
                    <Version />
                </div>
            </div>
        </>
    )
}

export default withRouter(ProfileComponent)