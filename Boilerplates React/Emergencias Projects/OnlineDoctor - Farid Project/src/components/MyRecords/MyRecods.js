import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileMedicalAlt } from '@fortawesome/free-solid-svg-icons'
import {GenericHeader} from '../GeneralComponents/Headers';

const MyRecords = () => {
    const records = useSelector(state => state.queries.medicalRecord)
    return(
        <>
            <GenericHeader>Mi historia</GenericHeader>
            <div className="p-2 myhistory-container">
                <ul>
                    {records && records.map((r, index) => {
                        return(
                            <li className="myhistory-consultation" key={index}>
                                <Link to={`./${r.assignation_id}`} className="d-flex">
                                    <div className="leftIcon">
                                        <FontAwesomeIcon icon={faFileMedicalAlt} />
                                    </div>
                                    <div>
                                        <div className="consultContainer">
                                            {r.created_dt}
                                        </div>
                                        <div>
                                            <p>Consulta por {r.mr.motivos_de_consulta}</p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default MyRecords;