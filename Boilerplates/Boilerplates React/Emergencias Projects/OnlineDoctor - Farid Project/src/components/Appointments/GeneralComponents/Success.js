import React from 'react';
import {Link} from 'react-router-dom';

const Success = () => {
    return (
        <div className="successPage">
        <div className="m-4 pt-4 pr-4 pb-2 pl-1 text-center rounded">
            <h3>Solicitud enviada</h3>
            <p>Llegará un WhatsApp para confirmar la solicitud.</p>
          <br />
          <div className="whatsappIcon">
                <i className="fas fa-check-circle w-100 whatsappIcon"></i>
            </div>
          <br />
            <span>
              <Link to="../../../../">Volver al inicio</Link>
            </span>
          </div>
          </div>
    )
}

export default Success