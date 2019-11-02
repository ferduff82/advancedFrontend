import React from 'react';

// Calendar
import BigCalendar from '../react-big-calendar'
import moment from 'moment';
import '../../../styles/calendar/react-big-calendar.scss';

// Components
import Sidebar from '../Sidebar/Sidebar';
import Loading from '../GeneralComponents/Loading';

// Redux
import { connect } from 'react-redux';
import {listenAssigns, listenAppointment, matchToStore} from '../../../store/actions/getAssignations';
import {sidebarSecOpen} from '../../../store/actions/frontActions';

// Others
import PropTypes from 'prop-types';

class CalendarComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navigate: {},
      view: {},
      loading: false,
      onDate: null
    }
  }

  viewSidebar = () =>  this.props.sidebarSecOpen()

  handleEventClick = (arg) => {
    console.log(arg)
    this.props.getAppoint(arg.specialty, arg.key)
    this.viewSidebar()
  }

  componentDidMount() {
    setTimeout(() => {
          this.props.matchTo(this.props.data.params)
          this.props.getAssigns(this.props.user.specialty) 
    }, 500)
  }

  customDaysPropGetter = (date) => {
    var calMonth = ('0' + (date.getMonth() + 1)).substr(-2)
    var calDay = ('0' + date.getDate()).substr(-2)
    const calDate = [date.getFullYear(), calMonth, calDay].join('-') 
    let filtered = this.props.assignations.filter((event) => {
      return event.datestring === calDate
    })
    if (this.state.view !== "day" && filtered.length !== 0)
      return {
        className: 'events-day',
      }
  }

  handleEventAgenda(e) {
    return <b className="d-flex" onClick={f => this.handleEventClick(e.event)}>{e.event.address}</b>
  }

  render() {
    moment.locale('es');
    const localizer = BigCalendar.momentLocalizer(moment);
    return (
      <>
        {this.props.secondSidebar ? <div><Sidebar contentType="doctor" /></div> : <div></div>}
        <div className="container-calendar h-100">
        {this.props.assignations ?
            <BigCalendar
              onNavigate={(date, view) => {
                this.setState({ onDate: date })
              }}
              onView={(view) => {
                this.setState({ view: view })
              }}
              onSelectEvent={this.handleEventClick}
              onSelectSlot={this.handleSelect}
              localizer={localizer}
              dayPropGetter={this.customDaysPropGetter}
              events={this.props.assignations}
              min={new Date('1988, 7, 14, 08:00')}
              max={new Date('1988, 7, 14, 21:00')}
              views={['month', 'day', 'agenda']}
              components={{ agenda: { event: (e) => this.handleEventAgenda(e) } }}
              /> : <Loading />
          }
          </div>
      </>
    )
  }
}

CalendarComponent.range = date => {
  let start = new Date()
  let end = start.add(start, 2, 'day')
  let current = start
  let range = []

  while (start.lte(current, end, 'day')) {
    range.push(current)
    current = start.add(current, 1, 'day')
  }

  return range
}

const mapStateToProps = (state) => {
  return {
    assignations: state.assignations.all,
    secondSidebar: state.front.sidebar.second,
    user: state.assignations.match,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAssigns: (specialty) => { dispatch(listenAssigns(specialty)) },
    getAppoint: (specialty, appointment) => { dispatch(listenAppointment(specialty, appointment)) },
    sidebarSecOpen: () => { dispatch(sidebarSecOpen()) },
    matchTo: (match) => { dispatch(matchToStore(match)) }
  }
}

BigCalendar.propTypes = {
  onView: PropTypes.func,
  onNavigate: PropTypes.func,
  label: PropTypes.string,
  view: PropTypes.string,
  views: PropTypes.array,
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarComponent);