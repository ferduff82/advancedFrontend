import React, {useRef} from 'react';
import ReactToPrint from 'react-to-print';
import emerlogo from '../../assets/logo-emergencias.png';
import {getDoctor} from '../../store/actions/firebaseQueries';
import QRCode from 'qrcode.react';

const DossierContainer = (props) => {
    const voucherRef = useRef();
    const [doc, setDoc] = React.useState({})
    var {att, tab} = props


    React.useEffect(() => {
        getDoctor(att.provider.cuit)
            .then(d => setDoc(d))
    }, [att])

    return(
        <>
        <div ref={voucherRef} className="dossier-container">
            <img src={emerlogo} alt="Emergencias" className="emerlogo" />
            {tab ? 
            <div className="d-flex flex-column justify-content-between p-2" id="voucher">
                <div className="dossier-att-info">
                    <p><b>Fecha</b><br/></p>
                    {att.mr.dt_cierre || "-"}
                    <hr />
                    <p><b>Paciente</b><br/></p>
                    <span className="dossier-patient-name">Nombre: {att.patient.fullname}</span><br />
                    <span className="dossier-doctor-dni">DNI: {att.patient.dni}</span><br />
                    <hr />
                    <p><b>Motivo de consulta</b><br />{att.mr.motivos_de_consulta || "-"}</p>
                    <hr />
                    <p><b>Resumen de la atención</b><br/>{att.mr.epicrisis || "-"}</p>
                    <hr />
                    <p><b>Indicaciones</b><br />{att.mr.tratamiento  || "-"}</p>
                    <hr />
                    <p><b>Reposo</b><br />{att.mr.reposo  || "No"}</p>
                    <hr />
                    <p><b>Médico</b><br/></p>
                    <span className="dossier-doctor-name">Nombre: {doc.fullname || ''} </span><br />
                    <span className="dossier-doctor-enroll">Matrícula: {doc.matricula || ""} </span><br />
                </div>
            </div>
            :
            <div className="p-4" id="dossier">
                <h3 className="text-center">Constancia de atención</h3><br />
                <div className="dossier-date text-right mb-4">Buenos Aires,<br/> {att.mr.dt_cierre}</div>
                <p className="text-left mb-5 dossier-text">A quien corresponda:<br /><br />
                Se deja constancia que el día {att.mr.dt_cierre}, el/la Sr/Sra. {att && att.patient.fullname} (DNI {att && att.patient.dni}) 
                &nbsp; fue asistido/a a través de nuestro servicio de consultas por el médico {doc.fullname || ''} (Matrícula {doc.matricula || ""}). <br />
                Diagnóstico presuntivo: {att.mr.diagnostico && att.mr.diagnostico.slice(0, -5)}. 
                {att && att.mr.reposo !== "no" ? <> Se sugiere reposo de {att.mr.reposo} hs.</> : <></>}
                <br />
                Sin otro particular, saludamos muy atte.</p><br />
                <p>
                        <b>
                            EMERGENCIAS<br />
                            Dirección Médica.
                        </b>
                    </p>
                    <br />
                        <small className="text-center">
                            <p>Verifique la atención en <br />
                            <a href="http://uma-health.com/att">http://uma-health.com/att</a><br />
                            <b>Código:</b> {btoa(att.assignation_id).slice(0, -2)}<br /><br /></p>
                        </small>
                    <div className="text-center mt-3">
                        <QRCode value={`http://uma-health.com/att/${att.patient.dni}/${btoa(att.assignation_id)}`} /><br />
                    </div>
                    <br /><br />
            </div>
        }
        </div>
        <div className="d-flex justify-content-around">
            <div className="btn btn-blue-lg">
                <ReactToPrint
                    trigger={() => <div className="d-flex justify-content-center">
                                        <div className="patient-action">Descargar</div>
                                    </div> }
                    content={() => voucherRef.current}
                />
            </div>
        </div>
        </>
    )
}

export default DossierContainer