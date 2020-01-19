
import React, { useEffect, useState, Children } from "react"
import { useDispatch, useSelector } from "react-redux"
import BigCalendar from './react-big-calendar/dist/react-big-calendar.esm'
import Moment from 'moment'
import { handleSelect, handleRemove, initialCalendarLoad } from '../../../store/actions/calendarActions'
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import "../../../styles/doctor/user/HolidaysData.scss"


const HolidaysData = (props) => {
    const date = useSelector(state => state.calendar.calendarDates.payload)
    const dispatch = useDispatch()
    const { dataInfo } = props
    const { holidays } = dataInfo.provider

    useEffect(() => {
        (!(dataInfo === undefined) && date.length === 0) && dispatch(initialCalendarLoad(holidays))
    }, [dataInfo])

    Moment.locale('es')
    let localizer = BigCalendar.momentLocalizer(Moment)
    const CURRENT_DATE = Moment().toDate()

    const ColoredDateCellWrapper = ({ children, value }) =>
        React.cloneElement(Children.only(children), {
            style: {
                ...children.style,
                backgroundColor: value < CURRENT_DATE ? '#A3BDCC' : ''
            }
        }
        )

    return (
        <div className="HolidaysDataWrapper">
            <div className="title">Marque los días que no trabaja</div>
            <BigCalendar
                selectable
                localizer={localizer}
                onSelectEvent={(event, dataClone) => dispatch(handleRemove(event.id, props))}
                onSelectSlot={(date, dataClone) => dispatch(handleSelect(date, props))}
                longPressThreshold={0}
                events={date}
                components={{ dateCellWrapper: ColoredDateCellWrapper }}
            />
        </div>
    )

}


export default HolidaysData
