import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import Axios from "axios";
import PhoneInput from "react-phone-input-2";
import Switch from "react-switch";

import Loading from "../components/global/Loading";
import { useSelector, useDispatch } from "react-redux";

import "../styles/StartUsingUma.scss";
import "react-phone-input-2/lib/style.css";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCheckCircle,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

const StartUmaDoctor = props => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(true);
  const [successSending, setSuccessSending] = useState(false);

  const sendPhoneCall = inputPhone => {
    let ws = inputPhone
      .replace("+", "")
      .replace("(", "")
      .replace(")", "")
      .replace(/\s/g, "");
    if (ws.slice(0, 2) === "54") ws = "549" + ws.slice(2);
    setLoading(true);
    const url = "https://mr-dot-uma-v2.appspot.com";
    const dataHsm = {
      ws: ws,
      hsm_name: "chatclub_open_session_v2",
      enterprise_username: "provider",
      hsm_params: [
        "Mi nombre es Uma y estoy para ayudarle. Uma",
        "Para acceder a la plataforma escriba *hola*"
      ],
      ttl: 1,
      optional_message:
        "Mi nombre es Uma y estoy para ayudarle. Para acceder a la plataforma escriba *hola*"
    };
    Axios.post(url + "/send_hsm", dataHsm, {
      "Content-type": "application/json"
    })
      .then(function(res) {
        console.log("[ONLINE-DOCTOR-DASHBOARD] /send_hsm Respuesta Ok");
        setLoading(false);
        setSuccessSending(true);
      })
      .catch(function(err) {
        console.log(
          "[ONLINE-DOCTOR-DASHBOARD] /send_hsm Ocurrió un error",
          err
        );
        setLoading(false);
        setSuccessSending("error");
      });
  };

  return (
    <div className="startUsingUmacontainer position-fixed text-center">
      {loading ? <Loading /> : ""}
      <div className="container-fluid d-flex justify-content-center p-2">
        <div id="formContent">
          {successSending ? (
            <div>
              <div className="closeButtonContainer">
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={() => props.closeModal(false)}
                />
              </div>
              <img src={logo} className="login-logo" alt="UMA" />
              {successSending === "error" ? (
                <div className="errorMessage">
                  <FontAwesomeIcon icon={faTimesCircle} />
                </div>
              ) : (
                <div className="successMessage">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </div>
              )}
              {successSending === "error" ? (
                <div className="sendDescription">
                  Hubo un error al enviar el mensaje. <br />
                  <div className="followInstructions">
                    Inténtelo nuevamente en unos minutos.
                  </div>
                </div>
              ) : (
                <div className="sendDescription">
                  Se ha enviado un mensaje a su whatsapp. <br />
                  <div className="followInstructions">
                    Siga las instrucciones para continuar.
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="closeButtonContainer">
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={() => props.closeModal(false)}
                />
              </div>
              <img src={logo} className="login-logo" alt="UMA" />
              <h5>
                Para darse alta en UMA ingresar número de telefono
                <br /> y haga click en enviar
              </h5>
              <div>
                <label>Regístrate con tu whatsapp</label>
                <br />
                <br />
                <div className="inputNumberContainer">
                  <PhoneInput
                    country={"ar"}
                    placeholder={"Escribe tu número"}
                    value={phone}
                    onChange={value => setPhone(value)}
                  />
                </div>
                <br />
                <button
                  className="btn btn-active buttonModal"
                  disabled={!isChecked}
                  onClick={() => sendPhoneCall(phone)}
                >
                  Enviar
                </button>
                <div className="sendDescription">
                  Enviaremos un mensaje de whatsapp a este número
                </div>
                <div className="acceptTermsAndConditions">
                  <div className="switchContainer">
                    <Switch
                      type="checkbox"
                      id="medicalVisit"
                      checked={isChecked}
                      name="medicalVisit"
                      onChange={() => setIsChecked(!isChecked)}
                    />
                  </div>
                  <Link to="/terminos" target="_blank" className="termsText">
                    Acepto los términos y condiciones y la política de
                    privacidad
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(StartUmaDoctor);
