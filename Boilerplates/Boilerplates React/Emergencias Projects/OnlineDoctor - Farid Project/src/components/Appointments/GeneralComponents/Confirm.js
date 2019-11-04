
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appointAction } from '../../../store/actions/frontActions';
import { Redirect, Link } from 'react-router-dom';
import '../../../styles/calendar/success.scss';

class Success extends Component {
	render() {
		const {specialty, cm, dt} = this.props.confirmed
		const maxAppointments = 3
		if (this.props.actionHandler === "Confirm") {
			if(this.props.pending.length <= 1) {
				return <Redirect to={`/${this.props.match.dni}/${this.props.match.ws}/appointments/online/success`} /> //  appointmentData={this.state.appointment}
			} else {
				return <Redirect to={`/${this.props.match.dni}/${this.props.match.ws}/appointments/online/cart`} />
			}
		} else if (this.props.actionHandler === "Add") {
			this.props.cleanFront()
			if(this.props.pending.length <= maxAppointments) {
				return <Redirect to={`/${this.props.match.dni}/${this.props.match.ws}/`}  />
			} else {
				return <Redirect to='./cart'/>
			}
		}
		return (
			<>
			<div className="header-container">Solicitud de turno</div>
			<div className="successPage">
			  	<div className="m-4 pt-4 pr-4 pb-2 pl-1 text-center rounded">
					<div className="text-left">
						<ul className="mt-3">
							<li><b>Especialidad:</b> {specialty ? specialty : ''} </li>
							<li><b>Lugar:</b> {cm}</li>
							<li><b>Fecha:</b> {dt}</li>
						</ul>
					</div>
					<br />
					<div>
						<div className="d-block mt-2 mb-3 pt-3">
							<button  type="button" className="btn btn-info mr-1" onClick={() => this.props.appointAction("Add")} >
								Agregar otro</button>
							<button  type="button" className="btn btn-info mr-1" onClick={() => this.props.appointAction("Confirm")}>
								Confirmar</button>
						</div>
						<small className="mt-5"><Link to={`/${this.props.match.dni}/${this.props.match.ws}/appointments/online/cart`}>Ver todos los turnos que estoy solicitando</Link></small>
					</div>
			  	</div>
		  	</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		confirmed: state.assignations.confirmedAppoint,
		actionHandler: state.front.actionHandler,
		match: state.assignations.match,
		pending: state.assignations.appointments
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		appointAction: (payload) => dispatch(appointAction(payload)),
		cleanFront: () => dispatch({type: 'CLEAN_FRONT'})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Success);
