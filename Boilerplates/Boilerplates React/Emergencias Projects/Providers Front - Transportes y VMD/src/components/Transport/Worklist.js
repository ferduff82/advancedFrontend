
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import Axios from 'axios';
import DayList from '../transportist/transfers/DayList';
import WeekList from '../transportist/transfers/WeekList';
import Wizard from '../transportist/transfers/Wizard';
import ValidateGeolocation from '../global/ValidateGeolocation';
import Loading from '../global/Utilities/Loading';
import { triggerCuit, triggerSocialWork } from '../../store/actions/transport/generalDataActions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import '../../styles/transport/Main.scss';
import '../../styles/transport/Worklist.scss';

const Worklist = (props) => {
    const [viewType, setViewType] = useState('day')
    const [initialData, setInitialData] = useState(null)
    const tel = localStorage.getItem('userPhone')
    const cuil = localStorage.getItem('userCuil')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(triggerSocialWork('osep_test'))
        dispatch(triggerCuit(cuil))
        Axios({ url: `https://providers-dot-uma-v2.appspot.com/provider/${tel}/${cuil}` })
            .then(function (response) {
                console.log(response);
                setInitialData(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    if (initialData) {
        if (!initialData.data.provider.vehicle) {
            return (
                <div className="p-4 text-center">
                    Esta App solo es válida para Transportistas
                </div>
            )
        } else {
            return (
                <div className="worklistWrapper">
                    {!initialData.data.provider.vehicle.patente ?
                        <div>
                            <Wizard dataInfo={initialData} />
                        </div>
                        : <div>
                            <ValidateGeolocation />
                            <div className="titleOnboarding">
                                <span className="back-arrow" onClick={() => props.history.push("/")}> <FontAwesomeIcon icon={faArrowLeft} /> </span>
                                Lista de traslados</div>
                            <div className="typeSelectionWrapper d-flex justify-content-center">
                                <div className={viewType === 'day' ? "day active" : "day"} onClick={() => setViewType('day')}>Día</div>
                                <div className={viewType === 'week' ? "week active" : "week"} onClick={() => setViewType('week')}>Semana</div>
                            </div>
                            <div className="contentCalendarWrapper">
                                {viewType === 'day' ?
                                    <DayList userIdB={cuil} /> : <WeekList />
                                }
                            </div>
                        </div>
                    }
                </div>
            )
        }
    } else {
        return <Loading />
    }
}

export default withRouter(Worklist);
