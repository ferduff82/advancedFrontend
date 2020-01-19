
import React, { Component } from 'react';

class PatientTreatmentAborted extends Component {

	constructor(props) {
		super(props);
		this.state = {
			open: true
		};
	}

	toggleClass() {
		const currentState = this.state.open;
		this.setState({ open: !currentState });
	};

	render() {

		return (
		  	<div>
		  		<div>
					<div className="pt-3 pr-3 pl-3 text-left">
						<h6 className="position-absolute">Cierre</h6>
						<div onClick={() => this.toggleClass()}><i className="material-icons text-right w-100">{this.state.open ? 'expand_more' : "expand_less"}</i></div>
					</div>
				</div>
		  		<div className={this.state.open ? 'd-none pt-3 mr-3 ml-3 rounded backForm' : 'p-3 mr-3 ml-3 rounded backForm'} >
					<div>
						<form>
							<div className="form-group">
								<label htmlFor="usr">Destino Final</label>
								<input type="text" className="form-control" id="finalDestination"></input>
							</div>
							<div className="form-group">
								<label htmlFor="alergies">Descripción</label>
								<textarea name="alergies" className="form-control" id="alergies"></textarea>
							</div>
						</form>
					</div>
				</div>
		  	</div>
		);
	}
}

export default PatientTreatmentAborted;
