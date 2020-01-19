
import React from "react";
import { connect } from "react-redux";
import Axios from 'axios';
import Moment from 'moment';
import { toggleDropdown, openMap, triggerLoadingTrip } from '../../../store/actions/frontActions';

import DisplayMap from './WorklistComponents/DisplayMap';
import getAssignationsData from '../../transportist/transfers/WorklistComponents/GetDataDaylist';
import AlertDisplay from './WorklistComponents/AlertDisplay';
import FilterAssignations from '../../global/Utilities/FilterAssignations';

import '../../../styles/transport/Main.scss';
import '../../../styles/transport/Worklist.scss';

class Daylist extends React.PureComponent {

    constructor(props) {
		super(props);
		this.state = {
            dateStatus: Moment(new Date()).format('YYYY-MM-DD'),
            getDateIncrement: 0,
            travelStatus: false,
            isActionCompleted: false,
            isActionCompletedMessage: '',
            triggerCancelModal: false,
            cancelCuitData: '',
            cancelAssignationId: '',
            cancelDate: '',
            cancelSocialWork: '',
            cancelReason: ''
		}
    }
    
    componentDidMount() {
        this.changeMomentLanguage();
        let todayDate = this.state.dateStatus;
        this.unsuscribe = getAssignationsData(todayDate, this.props.getCuitData, this.props.socialWork);
    }

    componentWillUnmount() {
        this.unsuscribe();
    }

    changeMomentLanguage() {
        Moment.lang('es', { 
            weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
            months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_')
        });
    }

    unsuscribeDate() {
        return false;
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

    removeActionCompleted() {
        this.setState({
            isActionCompleted : false
        });
    }

    removeDateFromHour(date) {
        var splitHour = date.split(' ');
        return splitHour[1];
    }

    cancelTrip(cancelReason) {
        this.setState({
            cancelReason: cancelReason
        })
    }

    startEndTravel(travelStatus, cuit, id, date, corpo) {

        let that = this;
        var postValue = {};
        var status = false;
        var isActionCompleted = false;
        var getPostLocation = {};
        var { coords } = this.props;

        this.props.triggerLoadingTrip(true);

        if (travelStatus === 'accepted') {
            status = 'notify_ride_started';
        } else if (travelStatus === 'started') {
            status = 'notify_remis_arrival';
        } else if (travelStatus === 'finished') {
            status = 'notify_ride_finished';
        } else if (travelStatus === 'cancel') {
            status = 'notify_ride_cancelled';
            that.setState({triggerCancelModal: false})
        }

        /* Temporary disabled cause of backend issue
        setTimeout(function() {
            if (!isActionCompleted) {
                that.setState({
                    isActionCompleted : 'danger',
                    isActionCompletedMessage : 'La operación realizada ha fallado, por favor inténtelo nuevamente...'
                });
                that.props.triggerLoadingTrip(false);
                setTimeout(function() {
                    that.removeActionCompleted();
                }, 10000)
            }
        }, 10000)
        */

        if (travelStatus === 'cancel') {
            postValue = {
                'cancelReason': that.state.cancelReason,
                'cuit': cuit,
                'tramo_id': 'assignations/'+ date + '/' + corpo + '/' + id
            }
        } else {
            postValue = {
                'cuit': cuit,
                'tramo_id': 'assignations/'+ date + '/' + corpo + '/' + id,
                'lat': coords.lat,
                'lon': coords.lon,
                'accuracy': coords.accuracy
            }
        }

        if (coords.accuracy < 200) {
            Axios.post('https://providers-dot-uma-v2.appspot.com/' + status, postValue)
            .then(function (response) {
                console.log(response);
                that.successOperation();
                isActionCompleted = true;
                setTimeout(function() {
                    that.removeActionCompleted();
                }, 13000)
            })
            .catch(function (error) {
                console.log(error);
                that.failedOperation();
            });
        } else {
            that.failedOperation();
        }
    }

    successOperation() {
        this.props.triggerLoadingTrip(false);
        this.setState({
            isActionCompleted : 'success',
            isActionCompletedMessage : 'La operación se ha realizado con éxito'
        });
    }

    failedOperation() {
        this.props.triggerLoadingTrip(false);
        this.setState({
            isActionCompleted : 'danger',
            isActionCompletedMessage : 'La operación realizada ha fallado, por favor inténtelo nuevamente...'
        });
    }

    determineColorHeader(status) {
        if (status === 'ATT') {
            return 'activeDrive headerDayList d-flex';
        } else if (status === 'DONE') {
            return 'finishedDrive headerDayList d-flex';
        } else {
            return 'headerDayList d-flex';
        }
    }

    render() {

        var that = this;
        const { toggleOpen, displayMap, getAssignations, getCuitData, socialWork, loadingTrip } = this.props;
        var displayAssignations = FilterAssignations(getAssignations, this.props);

        console.log(displayAssignations);

        return (
            <div className="dayCalendar">
                <AlertDisplay 
                    typeOfAlert={this.state.isActionCompleted} 
                    alertMessage={this.state.isActionCompletedMessage} 
                    onClick={() => this.removeActionCompleted()}
                />
                <div className="dayTitle d-flex justify-content-center">
                    <div className="selectPrevious" onClick={() => this.moveDate('back')}>
                        <i className="fas fa-chevron-circle-left"></i>
                        </div>
                    <div className="today">{ getAssignations[0] ? Moment(getAssignations[0].fecha).format('dddd Do [de] MMMM') : '' }</div>
                    <div className="selectNext" onClick={() => this.moveDate('forward')}>
                        <i className="fas fa-chevron-circle-right"></i>
                    </div>
                </div>
                
                {/* Modal Components */}

                { displayMap === true ? <DisplayMap /> : '' }

                {/* Cancel Modal */}

                { this.state.triggerCancelModal ? 
                    <div className="modalCancelTrip"> 
                        <div className="titleCancel text-center">Seleccione el motivo de cancelación</div>
                        <div className="closeModal" onClick={() => this.setState({triggerCancelModal: false})}>
                            <i className="fas fa-times"></i>
                        </div>
                        <select className="inputCancelReason form-control" 
                            value={this.state.cancelReason ? this.state.cancelReason : ''} 
                            onChange={(e) => this.cancelTrip(e.target.value)}>
                            <option value="">Sin informar</option> 
                            <option value="CORTA-GUARDIA-ANTES-DE-TIEMPO">Corta Guardia Antes de Tiempo</option> 
                            <option value="DEVUELVE-SERVICIO-ASIGNADO">Devuelve Servicio Asignado</option>
                            <option value="FALTA-DE-PAGO">Falta de pago</option>
                            <option value="FUERA-DE-ZONA-DE-COBERTURA">Fuera de Zona de Cobertura</option>
                            <option value="NO-ACEPTA-DIAGNÓSTICO-O-EDAD">No acepta diagnóstico o edad</option>
                            <option value="NO-ACEPTA-AL-PACIENTE">No Acepta al Paciente</option>
                            <option value="NO-ACEPTA-SUBIR-AL-PACIENTE-POR-ESCALERA">No acepta subir al paciente por escalera</option>
                            <option value="RECHAZA-SERVICIO-SIN-MOTIVO">Rechaza Servicio Sin Motivo</option>
                            <option value="SIN-ACUERDO-COMERCIAL">Sin Acuerdo Comercial</option>
                            <option value="SIN-COMPLEJIDAD-REQUERIDA">Sin Complejidad Requerida</option>
                            <option value="NO-ES-POSIBLE-COMUNICARSE">No es posible comunicarse</option>
                            <option value="SIN-DISPONIBILIDAD-DE-RECURSOS">Sin Disponibilidad de Recursos</option>
                        </select>
                        <button 
                            disabled={this.state.cancelReason ? false : true}
                            className="btn btn-active" 
                            onClick={() => this.startEndTravel('cancel', this.state.cancelCuitData, this.state.cancelAssignationId, this.state.cancelDate, this.state.cancelSocialWork)}>
                            Rechazar viaje
                        </button>
                    </div> 
                : ''}

                { /* List of Tasks */ }
                 
                { displayAssignations.length > 0 ? 
                    displayAssignations.map((item, index) => 
                        <div key={index}>
                            <div className="dayList">
                                <div className={this.determineColorHeader(item.current_state)}>
                                    <div className="leftSide">{that.removeDateFromHour(item.dts_preds.att)} hs - {item.request.fullname}</div>
                                    <div className="optionsDisplay d-flex">
                                        <div className="mapsDisplay" onClick={() => this.props.openMap(true, item)}>
                                            <i className="fas fa-map-marked-alt"></i>
                                        </div>
                                        <div className="showMore" onClick={() => this.props.toggleDropdown(index)}>
                                            {(toggleOpen === index) ? <i className="fas fa-minus-circle"></i> : <i className="fas fa-plus-circle"></i>}
                                        </div>
                                    </div>
                                </div> 

                                { /* Content */ }

                                {(toggleOpen === index) ? 
                                    <div className="contentContainer d-flex">
                                        <div className={item.current_state === 'DONE' ? "rightSide tripFinished" : "rightSide" }>
                                            { (item.current_state === 'PREASSIGN') ? 
                                                <div className="startTripContainer" key={index}>
                                                    <button 
                                                        className="btn btn-active d-flex justify-content-center" 
                                                        onClick={() => this.startEndTravel('accepted', getCuitData, item.assignation_id, item.fecha, socialWork)}>
                                                        { loadingTrip ? <div className="loading spinner-border text-primary" role="initial"></div> : <div>Yendo a destino</div> }
                                                    </button>
                                                    <button 
                                                        className="btn btn-active cancelButton d-flex justify-content-center" 
                                                        onClick={() => this.setState({
                                                            triggerCancelModal: true,
                                                            cancelCuitData: getCuitData,
                                                            cancelAssignationId: item.assignation_id,
                                                            cancelDate: item.fecha,
                                                            cancelSocialWork: socialWork
                                                        })}>
                                                        <div>Rechazar Viaje</div>
                                                    </button>
                                                </div>
                                            : '' }
                                            { (item.current_state === 'ASSIGN') ? 
                                                <div className="startTripContainer" key={index}>
                                                    <button 
                                                        className="btn btn-active d-flex justify-content-center" 
                                                        onClick={() => this.startEndTravel('started', getCuitData, item.assignation_id, item.fecha, socialWork)}>
                                                        { loadingTrip ? <div className="loading spinner-border text-primary" role="initial"></div> : <div>Comenzar tramo</div> }
                                                    </button>
                                                    <button 
                                                        className="btn btn-active cancelButton d-flex justify-content-center" 
                                                        onClick={() => this.setState({
                                                            triggerCancelModal: true,
                                                            cancelCuitData: getCuitData,
                                                            cancelAssignationId: item.assignation_id,
                                                            cancelDate: item.fecha,
                                                            cancelSocialWork: socialWork
                                                        })}>
                                                        <div>Rechazar Viaje</div>
                                                    </button>
                                                </div>
                                            : '' }
                                            { (item.current_state === 'ATT') ? 
                                                <div className="endTripContainer" key={index}>
                                                    <button 
                                                        className="btn btn-active d-flex justify-content-center" 
                                                        onClick={() => this.startEndTravel('finished', getCuitData, item.assignation_id, item.fecha, socialWork)}>
                                                        { loadingTrip ? <div className="loading spinner-border text-primary" role="initial"></div> : <div>Finalizar viaje</div> }
                                                    </button>
                                                    <button 
                                                        className="btn btn-active d-flex cancelButton justify-content-center" 
                                                        onClick={() => this.setState({
                                                            triggerCancelModal: true,
                                                            cancelCuitData: getCuitData,
                                                            cancelAssignationId: item.assignation_id,
                                                            cancelDate: item.fecha,
                                                            cancelSocialWork: socialWork
                                                        })}>
                                                        <div>Rechazar Viaje</div> 
                                                    </button>
                                                </div>
                                            : '' }
                                            { (item.current_state === 'CANCEL' || item.current_state === 'CANCEL_OP') ? 
                                                <div className="canceledTrip mb-2"><strong>El viaje a sido Cancelado</strong></div> 
                                            : ''}
                                            <div className="name"><strong>Nombre:</strong> <span>{item.request.fullname}</span></div>
                                            <div className="hours d-flex">
                                                <div className="hourStart"><strong>Inicio:</strong> <span>{that.removeDateFromHour(item.dts_preds.att)}hs</span></div>
                                                <div className="hourArrival"><strong>Llegada:</strong> <span>{that.removeDateFromHour(item.dts_preds.done)}hs</span></div>
                                            </div>
                                            <div className="arrivals">
                                                <div className="departure"><strong>Partida:</strong> <span>{item.request.geo_inicio.address}</span></div>
                                                <div className="arrivals"><strong>Destino:</strong> <span>{item.request.geo_fin.address}</span></div>
                                            </div>
                                            <div className="comments"><strong>Comentarios:</strong> <span>{item.request.notas}</span></div>
                                        </div>
                                    </div>
                                : ''}
                            </div>   
                        </div>
                    ) 
                : <div className="noDataDay">No hay asignaciones en cola.</div> }
            </div>   
        )
    }
}

const mapStateToProps = (state) => {
    return {
        toggleOpen: state.front.toggle.open,
        displayMap: state.front.map.open,
        loadingTrip: state.front.loadingTrip.activate,
        getAssignations: state.generalData.assignations.assignationsData,
        getCuitData: state.generalData.cuit.cuitData,
        socialWork: state.generalData.socialWork.socialWorkData,
        dataTrip: state.front.map.dataTrip,
        coords: state.geoActive.coords
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleDropdown: (dataDropdown) => { dispatch(toggleDropdown(dataDropdown)) },
        openMap: (mapOpen, dataTrip) => { dispatch(openMap(mapOpen, dataTrip)) },
        triggerLoadingTrip: (activeLoading) => { dispatch(triggerLoadingTrip(activeLoading)) }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Daylist);
