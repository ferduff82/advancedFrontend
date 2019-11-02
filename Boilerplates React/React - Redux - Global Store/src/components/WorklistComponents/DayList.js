
import React from "react";
import { connect } from "react-redux";
import Axios from 'axios';
import Moment from 'moment';

import { openDropdown, openMap, triggerLoadingTrip } from '../../store/actions/frontActions';

import DisplayMap from './DisplayMap';
import getAssignationsData from './GetDataDaylist';

import '../../styles/components/Main.scss';
import '../../styles/components/Worklist.scss';

class Daylist extends React.PureComponent {

    constructor(props) {
		super(props);
		this.state = {
            dateStatus: Moment(new Date()).format('YYYY-MM-DD'),
            getDateIncrement: 0,
            travelStatus: false
		}
    }

    unsuscribeDate() {
        return false;
    }
    
    componentDidMount() {
        Moment.lang('es', 
            { 
                weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
                months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_')
            }
        );
        let todayDate = this.state.dateStatus;
        this.unsuscribe = getAssignationsData(todayDate, this.props.getCuitData, this.props.socialWork);
    }

    componentWillUnmount() {
        this.unsuscribe();
    }

    moveDate(value) {

        var that = this;
        that.unsuscribe();

        if (value === 'forward') {
            incrementDate(that.state.getDateIncrement + 1)
        } else {
            incrementDate(that.state.getDateIncrement - 1)
        }

        function incrementDate(valueChange) {
            that.setState({
                getDateIncrement: valueChange
            }, () => {
                var new_date = Moment(that.state.dateStatus).add( that.state.getDateIncrement,'days');
                that.unsuscribeDate = getAssignationsData(new_date.format('YYYY-MM-DD'), that.props.getCuitData, that.props.socialWork);
            });
        }
    }

    startEndTravel(startOrEnd, cuit, id, date, corpo) {

        let that = this;
        let comienzo = 'notify_ride_started';
        let arrivo = 'notify_remis_arrival';
        let finalizado = 'notify_ride_finished';
        var status = false;

        if (startOrEnd === 'started') {
            status = comienzo;
        } else if (startOrEnd === 'arrived') {
            status = arrivo;
        } else {
            status = finalizado;
        }

        this.props.triggerLoadingTrip(true);

        Axios.post('https://providers-dot-uma-v2.appspot.com/' + status, {
            'cuit': cuit,
            'tramo_id': 'assignations/'+ date + '/' + corpo + '/' + id
        })
        .then(function (response) {
            console.log(response);
            that.props.triggerLoadingTrip(false);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {

        const { dropdownOpen, displayMap, getAssignations, getCuitData, socialWork, loadingTrip } = this.props;

        return (

            <div className="dayCalendar">

                <div className="dayTitle d-flex justify-content-center">
                    <div className="selectPrevious" onClick={() => this.moveDate('back')}><i className="fas fa-chevron-circle-left"></i></div>
                    <div className="today">{ getAssignations[0] ? Moment(getAssignations[0].fecha).format('dddd Do [de] MMMM') : '' }</div>
                    <div className="selectNext" onClick={() => this.moveDate('forward')}><i className="fas fa-chevron-circle-right"></i></div>
                </div>

                { displayMap === true ? <DisplayMap /> : '' }

                { /* List of Tasks */ }

                { 
                    getAssignations.map((item, index) => 
                        <div className="dayList" key={index}>
                            <div className={(item.current_status === 'STARTED') || (item.current_status === 'ATT') ? "activeDrive headerDayList d-flex" : "headerDayList d-flex"}>
                                <div className="leftSide">Viaje {index + 1}</div>
                                <div className="optionsDisplay d-flex">
                                    <div className="mapsDisplay" onClick={() => this.props.openMap(true, item)}><i className="fas fa-map-marked-alt"></i></div>
                                    <div className="showMore" onClick={() => this.props.openDropdown(index)}>
                                        {(dropdownOpen === index) ? <i className="fas fa-minus-circle"></i> : <i className="fas fa-plus-circle"></i>}
                                    </div>
                                </div>
                            </div> 

                            {(dropdownOpen === index) ? 
                                <div className="contentContainer d-flex">
                                    <div className={item.current_status === 'DONE' ? "rightSide tripFinished" : "rightSide" }>
                                        <div className="name">Nombre: <span>{item.request.fullname}</span></div>
                                        <div className="hours d-flex">
                                            <div className="hourStart">Inicio: <span>14hs</span></div>
                                            <div className="hourArrival">/ Llegada: <span>{item.hora}hs</span></div>
                                        </div>
                                        <div className="arrivals">
                                            <div className="departure">Partida: <span>{item.request.geo_fin.address}</span></div>
                                            <div className="arrivals">Destino: <span>{item.request.geo_inicio.address}</span></div>
                                        </div>
                                        <div className="comments">Comentarios: <span>{item.request.descrip}</span></div>

                                        { (!item.current_status) ? 
                                            <div className="startTripContainer" key={index}>
                                                <button className="btn btn-active d-flex justify-content-center" onClick={() => this.startEndTravel('started', getCuitData, item.assignation_id, item.fecha, socialWork)}>
                                                    { loadingTrip ? <div className="loading spinner-border text-primary" role="initial"></div> : <div>Comenzar Viaje</div> }
                                                </button>
                                            </div>
                                            : ''
                                        }
                                        { (item.current_status === 'STARTED') ? 
                                            <div className="arrivedTripContainer">
                                                <button className="btn btn-active d-flex justify-content-center" onClick={() => this.startEndTravel('arrived', getCuitData, item.assignation_id, item.fecha, socialWork)}>
                                                    { loadingTrip ? <div className="loading spinner-border text-primary" role="initial"></div> : <div>Ya llegué a destino</div> }
                                                </button>
                                            </div>
                                        : ''}
                                        { (item.current_status === 'ATT') ? 
                                            <div className="endTripContainer">
                                                <button className="btn btn-active d-flex justify-content-center" onClick={() => this.startEndTravel('finished', getCuitData, item.assignation_id, item.fecha, socialWork)}>
                                                    { loadingTrip ? <div className="loading spinner-border text-primary" role="initial"></div> : <div>He finalizado el viaje</div> }
                                                </button>
                                            </div>
                                        : ''}
                                        { (item.current_status === 'DONE') ? 
                                            <div className="completedTrip">El traslado ya se ha completado <i className="fas fa-check-circle"></i></div>
                                            : ''
                                        }
                                    </div>
                                </div>
                            : ''}
                        </div>   
                    ) 
                }
            </div>   
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dropdownOpen: state.front.dropdown.open,
        displayMap: state.front.map.open,
        loadingTrip: state.front.loadingTrip.activate,
        getAssignations: state.generalData.assignations.assignationsData,
        getCuitData: state.generalData.cuit.cuitData,
        socialWork: state.generalData.socialWork.socialWorkData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openDropdown: (dataDropdown) => { dispatch(openDropdown(dataDropdown)) },
        openMap: (mapOpen, dataTrip) => { dispatch(openMap(mapOpen, dataTrip)) },
        triggerLoadingTrip: (activeLoading) => { dispatch(triggerLoadingTrip(activeLoading)) }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Daylist);
