import React from 'react';
import Specialty from './Specialty';
import {connect} from 'react-redux';
import {matchToStore} from '../../../store/actions/getAssignations';
import {GenericHeader} from '../../GeneralComponents/Headers';

const List = (props) => {
    setTimeout(() => {
        props.matchTo(props.data.params)
    }, 5500)
    return(
    <>
        <GenericHeader onClick={() => {props.history.go(`/${props.match.params.dni}/`)}}>Especialidades</GenericHeader>
        <div className="specialties-list-container">
          <Specialty />
        </div>
    </>
    )
}


const mapDispatchToProps = dispatch => {
    return {
      matchTo: (match) => { dispatch(matchToStore(match)) }
    }
  }

  
export default connect(null, mapDispatchToProps)(List)