import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';


class Cart extends React.Component {

    removeAppointment = (index) => {
        console.log("Aca", this.props.cart, index)
        let newList = this.props.cart
        newList.splice(index, 1)
        this.props.removeAppoint(newList)
        this.forceUpdate()
    }

    render() {
    return (
    <div>
        <div className="header-container">Listado de turnos</div>
        {this.props.cart.length >= 3 ? <div className="text-center"><b>Ya solicitaste demasiados turnos</b></div> : <></>}
        <ul className="text-center">
            {
                this.props.cart.length >= 1 ? this.props.cart.map((appoint, index) => {
                return <li className="specialty-list  d-flex justify-content-between" key={index}>
                    <div className="appoint-detail">
                        <p className="m-0"><Moment locale="es" format="DD-MM-YYYY">{appoint.dt}</Moment></p>
                        <p className="m-0">{appoint.specialty.replace(/_/g, " ")}</p>
                        <p className="m-0">{appoint.cm}</p>
                    </div>
                    <div className="appoint-remove"
                            onClick={() => this.removeAppointment(index)}>
                        X
                    </div>
                </li>
            }) : <p className="m-3">No hay ningún turno seleccionado</p>}
            {this.props.cart.length >= 3 ? <>
            <button  type="button" className="btn btn-info mt-3 mr-1" disabled>Seguir seleccionando</button>
            <button  type="button" className="btn btn-info confirm-appointment mt-3 ml-1"
                onClick={() => this.props.history.push('./success')}>Confirmar</button></>
            : <>
            <button  type="button" className="btn btn-info confirm-appointment mt-3"
                    onClick={() => this.props.history.push(`/${this.props.match.dni}/${this.props.match.ws}/appointments/online`)}>Seguir seleccionando</button>
            <button  type="button" className="btn btn-info confirm-appointment mt-3 ml-1"
                    onClick={() => this.props.history.push('./success')}>Confirmar</button>
            </> }
        </ul>
    </div> )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.assignations.appointments,
        match: state.assignations.match,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeAppoint: (newList) => dispatch({type: 'REMOVE_APPOINT', payload: newList})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)