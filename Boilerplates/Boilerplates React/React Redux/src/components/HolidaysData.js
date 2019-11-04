
import React, {Children}  from "react";
import BigCalendar from './react-big-calendar/dist/react-big-calendar.esm'
import Moment from 'moment';
import 'moment/locale/es';
import UniqueId from './RandomId';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import "../styles/components/HolidaysData.scss"

class HolidaysData extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = { 
            events: [] 
        }
    }

    componentDidMount() {

        const dataInfo = this.props.dataInfo;
        const holidays = dataInfo.provider.holidays;
        const that = this;

        function initialData() {
            if (dataInfo === undefined) {
                initialData() 
            } else {
                var tempState = that._newTempArray(holidays);
                that.setState({
                    events: tempState
                })
            }
        } initialData();
    }

    _handeSelect = ({ start, end }) => {
        console.log('not select A');
        const id = UniqueId();
        const actualDate = Moment(start);
        const endDate = Moment(end).add(1, 'days');
        var newDate = { 'start': actualDate, 'end': endDate, 'id': id, 'title': 'Holidays X' };
        this.setState({ events: [...this.state.events, newDate] })
    }

    _newTempArray (holidays) {
        var newArray = [];
        if (Array.isArray(holidays)) {
            holidays.forEach(function(date) {
                const id = UniqueId();
                const actualDate = Moment(date);
                const endDate = Moment(date).add(1, 'days');
                newArray.push({ 'start': actualDate, 'end': endDate, 'id': id, 'title': 'Holidays X' });
            })
        }
        return newArray;
    }

    _remove(idName) {
        var that = this;
        that.state.events.forEach(function(event, index) {
            var allEvents = event;
            var getId = allEvents.id;
            if (idName === getId) {
                that.state.events.splice(index, 1);
                that.setState({
                    events: that.state.events
                });
            }
        })
        console.log('not select B');
        console.log(this.state.events);
    }

    render() {
        Moment.locale('es');
        var localizer = BigCalendar.momentLocalizer(Moment);
        const CURRENT_DATE = Moment().toDate();
        console.log(this.state.events);

        const ColoredDateCellWrapper = ({children, value}) =>
            React.cloneElement(Children.only(children), {
                style: {
                    ...children.style,
                    backgroundColor: value < CURRENT_DATE ? 'lightgreen' : '',
                },
            }
        );

        return (
            <div className="HolidaysDataWrapper">
                <BigCalendar
                    selectable
                    localizer={localizer}
                    onSelectEvent={(event) => this._remove(event.id)}
                    onSelectSlot={this._handeSelect}
                    events={this.state.events}
                    components={{
                        dateCellWrapper: ColoredDateCellWrapper
                    }}
                />
            </div>
        )
    }
}

export default HolidaysData;
