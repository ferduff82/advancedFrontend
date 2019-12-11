
import React from 'react';
import '../styles/Header.scss';

class Header extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
	}

	toggleClass() {
		const currentState = this.state.open;
		this.setState({ open: !currentState });
	};

	render() {
		return (
			<div className="header">
				<div className="header-wrapper">
					<div className="p-3 text-center">
						<h5 className="white-color">Ficha de atención Médica</h5>
					</div>
				</div>
			</div>
		)
	}

}

export default Header;
