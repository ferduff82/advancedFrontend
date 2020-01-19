
import React from "react";
import { connect } from "react-redux";
import Axios from 'axios';
import Moment from 'moment';

import { toggleDropdown } from '../../../store/actions/frontActions';

import '../../../styles/transport/Main.scss';
import '../../../styles/transport/Worklist.scss';

class Main extends React.PureComponent {

    constructor(props) {
		super(props);
		this.state = {
            weekData: {
                0 : []
            }
		}
    }
    
    componentDidMount() {

        let that = this;
        let getDatesArray = this.getDates();

        Axios.post('https://providers-dot-uma-v2.appspot.com/remis_schedule', {
            "cuit": that.props.getCuitData,
            "initial_date": getDatesArray[0],
            "last_date": getDatesArray.pop(),
        })
        .then(function (response) {
            console.log(response.data);
            that.setState({
                weekData: response.data
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getDates() {
        let num = 0
        let datesStore = [];

        while (num < 7) {
            let getDates = Moment().add(num, 'days').format('YYYY-MM-DD');   
            datesStore.push(getDates);
            num ++;
        }
        return datesStore;
    }

    getDay(date) {
    
        Moment.lang('es', 
            { weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_')} 
        );

        let dateMoment = Moment(date, "YYYY-MM-DD");
        let turnToDay = dateMoment.format('dddd');
        return turnToDay
    }

    orderByTime(time) {
        const sortedArray = time.sort(function (a, b) {
            var aHour = new Moment(a.partida).format('HH');
            var bHour = new Moment(b.partida).format('HH');
            var aMinutes = new Moment(a.partida).format('mm');
            var bMinutes = new Moment(b.partida).format('mm');
            // compare hours first
            if (aHour < bHour) return -1;
            if (aHour > bHour) return 1;
            if (aMinutes < bMinutes) return -1;
            if (aMinutes > bMinutes) return 1;
            // couldn't break the tieF
            return 0;
        });
        return sortedArray;
    }

    render() {

        const that = this;
        const { toggleOpen } = this.props;

        return (
            <div className="weekCalendar">
                { 
                    Object.keys(this.state.weekData).map((key, index) => 
                        <div className="wrapDay" key={index}>
                            {
                                Object.keys(this.state.weekData).length > 1 ? 
                                <div className="weekDay" onClick={() => this.props.toggleDropdown(this.getDay(key))}>
                                    <div className="d-flex justify-content-between">
                                        <div>{this.getDay(key)}</div>
                                        <div>
                                            {(toggleOpen === this.getDay(key)) ? <i className="fas fa-minus-circle"></i> : <i className="fas fa-plus-circle"></i>}
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="loading spinner-border text-primary" role="initial"></div>
                            }
                            <div className={(toggleOpen === this.getDay(key)) ? "contentWeekDay" : "contentWeekDay hide" }>
                                {
                                    this.state.weekData[key].length === 0 ? 
                                        <div>No hay visitas este día</div>
                                    : 
                                    <div>
                                        { 
                                            that.orderByTime(this.state.weekData[key]).map((data, index) => 
                                                <div key={index} className="itemWeek">
                                                    <div className="dataName"><strong>Partida:</strong> {data.partida.split(' ')[1]} / <strong>Llegada:</strong> {data.llegada.split(' ')[1]}</div>
                                                    <div className="location"><strong>Desde:</strong> {data.desde} <br/> <strong>Hasta:</strong> {data.hasta}</div>
                                                    <hr/>
                                                </div>
                                            )
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        toggleOpen: state.front.toggle.open,
        getCuitData: state.generalData.cuit.cuitData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleDropdown: (dataDropdown) => { dispatch(toggleDropdown(dataDropdown)) }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);
