import React from 'react';
import {SignOut} from '../User/Login';

const Version = () => {
    function logout() {
        SignOut()
        console.log("Logged Out")
    }
    return( <div className="text-center">
                <p onClick={() => logout()} className="mb-3 close-sesion">Cerrar sesión</p>
                <small>UMA Versión 1.0.25</small>
            </div> )
}

export default Version