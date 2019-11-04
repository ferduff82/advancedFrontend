
import React from "react";
import { connect } from "react-redux";

import { openMap } from '../../store/actions/frontActions';

import Map from './MapResources/GoogleMapsConfig';

import '../../styles/components/DisplayMap.scss';

class MapComponent extends React.PureComponent {

    render() {

        const { dataTrip } = this.props;

        return (
            <div className="mapContainer">
                <div className="return">
                    <div className="back  d-flex">
                        <i className="fas fa-chevron-left"></i>
                        <div className="back-text" onClick={() => this.props.openMap(false, 0, 0)}>Volver</div>
                    </div>
                </div>
			    <div className="googleMap">
                    <Map dataTrip={dataTrip} />
                </div>
                <div className="dataTimeAdressContainer justify-content-between">
                    <div className="time d-flex">
                        <div className="timeTitle"><strong>Horario:&nbsp; </strong></div>
                        <div className="timeDepartureData">{dataTrip.hora}</div>
                        <div className="timeArrivalData">&nbsp;/ 10:30hs.</div>
                    </div>
                    <div className="address d-flex">
                        <div className="addressTitle"><strong>Dirección:&nbsp; </strong></div>
                        <div className="addressData">{dataTrip.request.geo_fin.address}</div>
                    </div>
                </div>
            </div>   
        )
    }
}

const mapStateToProps = (state) => {
    return {
        displayMap: state.front.map.open,
        dataTrip: state.front.map.dataTrip
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openMap: (mapOpen, geo_inicio, geo_fin) => { dispatch(openMap(mapOpen, geo_inicio, geo_fin)) }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
