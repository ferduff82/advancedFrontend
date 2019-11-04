import React from 'react'
import FullCalendar from '../components/Appointments/Calendar/FullCalendar';

const Calendar = (match) => {
    return (
        <div className="cal-fullheight">
            {/*  <OnlineDoctorHeader /> */}
            <FullCalendar data={match.match} />
            {/* <Footer /> */}
        </div>
    )
}

export default Calendar;