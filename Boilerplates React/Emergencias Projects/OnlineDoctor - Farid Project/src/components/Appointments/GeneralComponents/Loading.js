
import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';

const override = {'position': 'absolute', 'top': '35%', 'left': '35%', 'padding': '0 !important', 'margin': '0 !important'}

class Loading extends Component {

	render() {
		return (
            <div className='sweet-loading'>
                <ClipLoader
                css={override}
                sizeUnit={"px"}
                size={100}
                color={'#123abc'}
                />
            </div>
		);
	}
}

export default Loading;
