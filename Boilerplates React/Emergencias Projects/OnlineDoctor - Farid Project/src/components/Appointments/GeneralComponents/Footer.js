import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import '../../../styles/Navigation.scss';


class Footer extends React.Component {
   render() {
    return(
        <div className="navigation position-fixed">
        <div className="menu-wrapper d-flex">
           {this.props.user.specialty ? 
           <>
           <Link to={`/${this.props.user.dni}/${this.props.user.ws}/${this.props.user.specialty}/`} className="background-secondary full-width">
              <div className='active p-2'>
                 <i className="material-icons">location_on</i>
              </div>
           </Link>
           <Link to={`/cart`} className="background-secondary full-width">
            <div className='active p-2'>
               <i className="material-icons">perm_identity</i>
            </div>
            </Link>
           <Link to={`/${this.props.user.dni}/${this.props.user.ws}/${this.props.user.specialty}/calendar`} className="background-secondary full-width">
              <div className='active p-2'>
                 <i className="material-icons">calendar_today</i>
              </div>
           </Link>
           </>
           :
           <>
           <div className='footer active w-100'>
           <Link to={`/cart`} className="background-secondary full-width">
            <div className='active p-2'>
               <i className="material-icons">perm_identity</i>
            </div>
            </Link>
            </div>
            </>
           }
           </div>
     </div>
    )
   }
}

const mapStateToProps = (state) => {
   return {
       user: state.assignations.match
   }
 }

export default connect(mapStateToProps)(Footer);