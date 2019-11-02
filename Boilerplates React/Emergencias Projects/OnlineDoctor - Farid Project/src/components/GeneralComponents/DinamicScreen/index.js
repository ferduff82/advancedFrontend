import React from 'react';
import {useSelector} from 'react-redux';
import {GenericHeader} from '../../GeneralComponents/Headers';
import Loading from '../../GeneralComponents/Loading'
import '../../../styles/dinamic.scss';

const DinamicScreen = (props) => {
  const loading = useSelector(state=>state.front.loading)
  return (
  <div className="dinamic-template">
    <GenericHeader />
      {loading && <Loading />}
     <div className="dinamic-content-container">
        {props.children}
     </div>
  </div>
  )
}

export default DinamicScreen