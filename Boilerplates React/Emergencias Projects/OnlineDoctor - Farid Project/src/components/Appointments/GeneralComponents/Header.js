import React from 'react';
import  { connect } from 'react-redux';
import '../../../styles/Index.scss';

const Header = (props) => {
    return(
        <div className="header-container">
           {props.specialty ? props.specialty.replace(/_/g, " ") : ""}
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        specialty: state.assignations.match.specialty
    }
}
export default connect(mapStateToProps)(Header);