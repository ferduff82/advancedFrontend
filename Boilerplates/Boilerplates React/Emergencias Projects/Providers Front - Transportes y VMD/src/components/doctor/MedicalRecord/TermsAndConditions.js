
import React, { Component } from 'react';
import '../styles/TermsAndConditions.scss';
import Switch from 'react-switch';

class TermsAndConditions extends Component {

	constructor(props) {
		super(props);
		this.state = {
			termsAccepted: false,
		};
	}

	toogleConditions() {
		let toogleTerms = !this.state.termsAccepted;
		this.setState({termsAccepted: toogleTerms});
		this.props.setTermsAndConditions(toogleTerms);
	}

	render() {
		return (
		  	<div className="termsAndConditions pt-3 pr-3 pl-3">
				<div className="termsEditContainer custom-control custom-checkbox">
					<Switch type="checkbox" id="termsAndConditions" className="custom-control-input termsEditCheck" onChange={() => this.toogleConditions()} checked={this.state.termsAccepted}/>
					<label className="termsEditLabel custom-control-label" htmlFor="termsAndConditions">Aceptar términos y condiciones</label>
				</div>
		  	</div>
		)
	}
}

export default TermsAndConditions;
