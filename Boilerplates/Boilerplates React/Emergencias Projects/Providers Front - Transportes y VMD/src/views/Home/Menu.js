import React from "react"
import { withRouter } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faLaptopMedical,
  faAmbulance,
  faBus,
  faUserCog,
  faNotesMedical,
  faList,
  faMoneyBill
} from "@fortawesome/free-solid-svg-icons"
import Module from "./Module"

// import Notification from "../Notifications/Notification"

const Menu = ({ user: { rol } }) => {
  return (
    <section className="modules-container">
      {/* <Notification /> */}
      {rol === "MEDICO" ?
        <>
          <Module link={`/`}
            enabled={false}
          >
            <div className="module-ico">
              <FontAwesomeIcon icon={faLaptopMedical} />
            </div>
            <p className="module-title">Doctor en línea</p>
          </Module>
          <Module
            link={`/provider`}
            styles="lighter-module"
            enabled={true}
          >
            <div className="module-ico">
              <FontAwesomeIcon icon={faNotesMedical} />
            </div>
            <p className="module-title">Visita médica domiciliaria</p>
          </Module>
          <Module
            link={`/onlinedoctor/when`}
            enabled={false}
          >
            <div className="module-ico">
              <FontAwesomeIcon icon={faNotesMedical} />
            </div>
            <p className="module-title">Consultorio</p>
          </Module>
          <Module link={`/transport`}
            enabled={false}
          >
            <div className="module-ico">
              <FontAwesomeIcon icon={faBus} />
            </div>
            <p className="module-title">Cuidados domiciliarios</p>
          </Module>
          <Module
            link={`/MedicProfile`}
            styles="lighter-module"
            enabled={true}
          >
            <div className="module-ico">
              <FontAwesomeIcon icon={faUserCog} />
            </div>
            <p className="module-title">Datos personales</p>
          </Module>
        </>
        :
        <>
          <Module
            link={`/TransportProfile`}
            styles="lighter-module"
            enabled={true}
          >
            <div className="module-ico">
              <FontAwesomeIcon icon={faUserCog} />
            </div>
            <p className="module-title">Datos personales</p>
          </Module>
          <Module
            link={`/transport/worklist`}
            styles="lighter-module"
            enabled={true}
          >
            <div className="module-ico">
              <FontAwesomeIcon icon={faAmbulance} />
            </div>
            <p className="module-title">Lista de traslados</p>
          </Module>
          <Module
            link={`/transport/travels`}
            styles="lighter-module"
            enabled={true}
          >
            <div className="module-ico">
              <FontAwesomeIcon icon={faList} />
            </div>
            <p className="module-title">Viajes realizados</p>
          </Module>
          <Module
            link={`/transport/payments`}
            enabled={false}
          >
            <div className="module-ico">
              <FontAwesomeIcon icon={faMoneyBill} />
            </div>
            <p className="module-title">Pagos</p>
          </Module>
          <Module
            link={`/transport/payments`}
            enabled={false}
          >
            <div className="module-ico">
              <FontAwesomeIcon icon={faMoneyBill} />
            </div>
            <p className="module-title">Ambulancia</p>
          </Module>
        </>
      }
    </section>
  );
};

export default withRouter(Menu);



