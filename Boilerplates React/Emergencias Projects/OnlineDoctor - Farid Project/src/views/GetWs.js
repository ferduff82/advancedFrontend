import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import { GenericHeader } from '../components/GeneralComponents/Headers';
import app from "../config/DBConnection";
import '../styles/getWS.scss';

const GetWs = (props) => {
    const [ws, setWs] = React.useState()

    // Check if user join by root path but was loged before
    useEffect(() => {
        let user = localStorage.getItem('userRegistered')
        user && user.length >= 12 && props.history.push('/'+user)
    }, [props.history])

    let handleSubmit = (e) => {
        e.preventDefault();
        var userId = app.auth().currentUser.uid;

    
        let newWs
        if(ws.length === 10) {
            newWs = '54911' + ws.slice(2)
            localStorage.setItem('userRegistered', newWs)
            props.history.push('/'+newWs)
        } else if (ws.length === 11) {
            newWs = '54911'+ws.slice(3)
            localStorage.setItem('userRegistered', newWs)
            props.history.push('/'+newWs)
        } else if (ws.length === 13) { 
            localStorage.setItem('userRegistered', newWs)
            props.history.push('/'+newWs)
        } else {
            alert("El número de Whatsapp es incorrecto")
        }
        localStorage.setItem('userToken', userId)
    }

    return (
        <div className="getWsWrapper">
            <GenericHeader>Ingreso</GenericHeader>
            <div className="p-3">
                <p className="text-center numberError">No pudimos detectar su número de teléfono. Por favor introduzca su número para continuar.</p>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label className="form-label helperText" htmlFor="name">Número de whatsapp</label>
                    <input className="form-control inputStyles" id="name" placeholder="11xxxxxxxx" required 
                            autoComplete="off" type="text" onChange={(e) => setWs(e.target.value)} />
                    <div className="buttonContainer">
                        <button className="btn" type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default withRouter(GetWs)