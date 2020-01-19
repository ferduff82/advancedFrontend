
import React, { Component } from 'react';
import '../styles/ModalGDUH.scss';

class ModalGDUH extends Component {

	constructor(props) {
		super(props);
		this.state = {
			died: true,
			lifeRisk: false,
			uci: false,
			finalValue: null
		};
	}

	diedOrLife(value, e, hide, show, urgency) {
		e.preventDefault();
		if (value) {
			this.props.hiddeShowModal(false);
			this.props.setUrgency(urgency);
		} else {
			this.setState({[hide]: false});
			this.setState({[show]: true});
		}
	}

	uci(value, e) {
		e.preventDefault();
		if (value) {
			this.props.hiddeShowModal(false);
			this.props.setUrgency(2);
		} else {
			this.props.hiddeShowModal(false);
			this.props.setUrgency(3);
		}
	}

	render() {

		return (
		  	<div className="modalGDUH position-fixed">
			  	<div className="backElement position-fixed"></div>
				<div className="selectionBack position-relative">
					<div className="head">
						<div className="close-button" onClick={() => this.props.hiddeShowModal(false)}><i className="fas fa-times"></i></div>
					</div>
					<div className="body">
						<div className={ this.state.died ? '' : 'hide' }>
							<h5>¿Falleció?</h5>
							<div className="options-container">
								<button className="btn btn-active" onClick={(e) => this.diedOrLife(true, e, '', '', 0)}>SI</button>
								<button className="btn btn-active" onClick={(e) => this.diedOrLife(false, e, 'died', 'lifeRisk', null)}>NO</button>
							</div>
						</div>
						<div className={ this.state.lifeRisk ? '' : 'hide' }>
							<h5>¿Tiene riesgo de vida inmediata?</h5>
							<div className="options-container">
								<button className="btn btn-active" onClick={(e) => this.diedOrLife(true, e, '', '', 1)}>SI</button>
								<button className="btn btn-active" onClick={(e) => this.diedOrLife(false, e, 'lifeRisk', 'uci', null)}>NO</button>
							</div>
						</div>
						<div className={ this.state.uci ? '' : 'hide' }>
							<h5>¿Requiere UCI (Unidad de Cuidado Intensivo)?</h5>
							<div className="options-container">
								<button className="btn btn-active" onClick={(e) => this.uci(true, e)}>SI</button>
								<button className="btn btn-active" onClick={(e) => this.uci(false, e)}>NO</button>
							</div>
						</div>
					</div>
				</div>
		  	</div>
		)
	}
}

export default ModalGDUH;
