import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import app from "../../config/DBConnection";
import { GenericHeader } from '../GeneralComponents/Headers';

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [msg, setMessage] = useState('')
    var auth = app.auth();
    function resetPassword(e) {
        e.preventDefault()
        setMessage("Compruebe su casilla de email")
        auth.sendPasswordResetEmail(password).then(function(res) {
            setMessage(res)
            console.log(res)
        }).catch(function(err) {
            setMessage(err)
            console.log(err.message)
        });
    }
    return (
    <>
        <GenericHeader>Recuperar contraseña</GenericHeader>
        <p className="text-center numberError p-2">{!!msg && msg}</p>
        <form onSubmit={(e) => resetPassword(e)} className="p-2">
            <label className="form-label m-0 w-100" htmlFor="email">Email</label>
            <input className="form-control inputStyles w-100" id="email" placeholder="suemail@mail.com" required 
                    autoComplete="off" type="text" onChange={(e) => setPassword(e.target.value)} />
            <div className="buttonContainer pt-5">
                <button className="btn btn-blue-lg" type="submit">Enviar</button>
            </div>
            <div className="text-center"><a href="/">Cancelar</a></div>
        </form>
    </>
    )
}

export default withRouter(ResetPassword)