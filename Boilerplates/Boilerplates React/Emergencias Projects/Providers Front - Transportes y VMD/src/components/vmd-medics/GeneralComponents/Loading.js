
import React from 'react';
import { ClipLoader } from 'react-spinners';

const override = {'position': 'absolute', 'top': 'calc(50% - 50px)', 'left': 'calc(50% - 50px)', 'padding': '0 !important', 'margin': '0 !important'}

const Loading = () => {
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

export default Loading;
