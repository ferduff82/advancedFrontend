
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Axios from 'axios';
import GetPaydComponent from '../transportist/transfers/GetpaydComponent';
import Wizard from '../transportist/transfers/Wizard';
import ValidateGeolocation from '../global/ValidateGeolocation';
import Loading from '../global/Utilities/Loading';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import '../../styles/transport/Main.scss';
import '../../styles/transport/Travels.scss';

const Travels = (props) => {
    const [initialData, setInitialData] = useState(null)
    const [displayModalPay, setDisplayModalPay] = useState(false)
    const assignations = useSelector(state => state.generalData.assignations.assignationsData)
    const tel = localStorage.getItem('userPhone')
    const cuil = localStorage.getItem('userCuil')

    useEffect(() => {
        Axios({ url: `https://providers-dot-uma-v2.appspot.com/provider/${tel}/${cuil}` })
            .then((response) => {
                console.log(response);
                setInitialData(response)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    if (initialData) {
        console.log(assignations);
        let filterAssignations = assignations.filter(item => item.provider_id === cuil &&
            item.current_state === 'DONE');
        console.log(filterAssignations);
        if (!initialData.data.provider.vehicle) {
            return (
                <div className="p-4 text-center">
                    Esta App solo es válida para Transportistas
                    </div>
            )
        } else {
            return (
                <div className="travelsWrapper">
                    {!initialData.data.provider.vehicle.patente ?
                        <div>
                            <Wizard dataInfo={initialData} />
                        </div>
                        : <div>
                            <ValidateGeolocation />
                            <div className="titleOnboarding">
                                <span className="back-arrow" onClick={() => props.history.push("/")}> <FontAwesomeIcon icon={faArrowLeft} /> </span>
                                Listado de viajes realizados</div>
                            <div className="tableContainer">
                                {filterAssignations.length > 0 ?
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Fecha</th>
                                                <th>Nombre</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filterAssignations.map((item, index) =>
                                                <tr key={index}>
                                                    <td className={item.geo_watcher.inconsistency === 'si' ? 'inconsistency' : ''}>
                                                        {item.fecha}
                                                    </td>
                                                    <td className={item.geo_watcher.inconsistency === 'si' ? 'inconsistency' : ''}>
                                                        {item.request.fullname}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    : <div className="noChargeTrip">No hay viajes para cobrar</div>}
                            </div>
                            <div className="getPaydContainer">
                                <button className="btn btn-active getPayd" onClick={() => setDisplayModalPay(true)}>Cobrar Viajes</button>
                            </div>
                            {displayModalPay &&
                                <div className="getPaydModal">
                                    <div className="getPaydModalContent">
                                        <div className="headerPayContainment d-flex">
                                            <h6>Cobrar viajes</h6>
                                            <div className="closeModal" onClick={() => setDisplayModalPay(false)}>
                                                <i className="fas fa-times"></i>
                                            </div>
                                        </div>
                                        <GetPaydComponent />
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
            )
        }
    } else {
        return <Loading />
    }
}

export default withRouter(Travels);
