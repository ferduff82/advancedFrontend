import React, {useState} from 'react';
import {Header} from '../components/GeneralComponents/Header'
import Version from '../components/GeneralComponents/Version'
const UserNotFound = (props) => {
    const [user, setUser] = useState({dni: ''})

    let handleSubmit = (e) => {
        e.preventDefault();
        let cuit = btoa(user.dni)
        localStorage.setItem('userRegistered', cuit);
        props.history.push(`/${cuit}/`);
      }

      let handleDni = (e) => {
        e.preventDefault();
        setUser({dni: e.target.value})
      }
    return(
    <>            
        <Header>
        Por favor introduzca sus datos
        </Header>
        <form>
            <div className="col-sm-12 mb-3">
                <input className="form-control" id="dni" placeholder="Número de CUIT" required 
                    autoComplete="off" type="tel" onChange={(e) => handleDni(e)} 
                />
                <div className="valid-feedback">
                    Este campo es obligatorio
                </div>
            </div>
            <div className="col-sm-12 mb-3 text-right">
                <button className="btn btn-outline-primary" onClick={(e) => handleSubmit(e)}>Enviar</button>
            </div>
        </form>
        <Version />
    </>
)
}

export default UserNotFound