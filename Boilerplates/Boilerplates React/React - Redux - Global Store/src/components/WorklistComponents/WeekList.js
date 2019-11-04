
import React from "react";
import { connect } from "react-redux";
import Axios from 'axios';
import Moment from 'moment';

import { openDropdown } from '../../store/actions/frontActions';

import '../../styles/components/Main.scss';
import '../../styles/components/Worklist.scss';

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
        console.log(dateMoment);
        let turnToDay = dateMoment.format('dddd');
        return turnToDay
    }

    render() {

        const { dropdownOpen } = this.props;

        return (
            <div className="weekCalendar">
                { 
                    Object.keys(this.state.weekData).map((key, index) => 
                        <div className="wrapDay" key={index}>
                            {
                                Object.keys(this.state.weekData).length > 1 ? 
                                <div className="weekDay" onClick={() => this.props.openDropdown(this.getDay(key))}>
                                    <div className="d-flex justify-content-between">
                                        <div>{this.getDay(key)}</div>
                                        <div>
                                            {(dropdownOpen === this.getDay(key)) ? <i className="fas fa-minus-circle"></i> : <i className="fas fa-plus-circle"></i>}
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="loading spinner-border text-primary" role="initial"></div>
                            }
                            <div className={(dropdownOpen === this.getDay(key)) ? "contentWeekDay" : "contentWeekDay hide" }>
                                {
                                    this.state.weekData[key].length === 0 ? 
                                        <div>No hay visitas este día</div>
                                    : 
                                    <div>
                                        { 
                                            this.state.weekData[key].map((data) => 
                                                <div>
                                                    <div className="dataName"><strong>- Partida:</strong> {data.partida} / <strong>Llegada:</strong> {data.llegada}</div>
                                                    <div className="location"><strong>Desde:</strong> {data.desde} / <strong>Hasta:</strong> {data.hasta}</div>
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
        dropdownOpen: state.front.dropdown.open,
        getCuitData: state.generalData.cuit.cuitData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openDropdown: (dataDropdown) => { dispatch(openDropdown(dataDropdown)) }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);
