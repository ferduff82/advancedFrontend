import React from 'react'
import List from '../components/Appointments/Specialties/List';
/* import Footer from '../components/GeneralComponents/Footer'; */

const Specialties = (match) => {
    return (
        <div className="cal-fullheight">
            <List data={match.match} />
            {/* <Footer /> */}
        </div>
    )
}

export default Specialties;