
import React, { Component } from 'react';

import '../styles/PatientTreatment.scss';

class PatientTreatment extends Component {

	constructor(props) {
		super(props);
		this.state = {
			open: true
		}
	}

	/* General Functions */

	showThisDropdown() {
		this.props.setArrowOpen('electronicPrescription');
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.arrowOpen  === 'electronicPrescription') {
			this.setState({open: false});
		} else {
			this.setState({open: true});
		}
	}

	render() {
		return (
		  	<div className="electronicPrescription">
		  		<div>
				  	<div className="mb-3 mt-4 mr-3 ml-3 text-left aditional-height d-flex" onClick={() => this.showThisDropdown()}>
				  		<div className="color-left"></div>
						<div className="mt-2">
							<h6 className="position-absolute">Receta electrónica</h6>
							<div className="w-100">{this.state.open ? <i className="fas fa-plus-circle circle-icon position-absolute"></i> : <i className="fas fa-minus-circle circle-icon float-right position-absolute"></i>}</div>
						</div>
					</div>
				</div>
				<div className={this.state.open ? 'd-none pt-2 pr-3 pb-3 pl-3 mr-2 ml-2 rounded backForm' : 'pt-2 pr-3 pb-3 pl-3 mr-2 ml-2 rounded backForm'} >
					<div>
						<div className="form-group">
							<label htmlFor="observations">En desarrollo...</label>
							<textarea name="finalDescription" className="form-control" ref='observations' id="observations"></textarea>
						</div>
					</div>
				</div>
		  	</div>
		);
	}
}

export default PatientTreatment;
