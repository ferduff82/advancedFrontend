
import React from "react";
import { connect } from "react-redux";

import { openMap } from '../../../../store/actions/frontActions';

import Map from './MapResources/GoogleMapsConfig';

import '../../../../styles/transport/DisplayMap.scss';

class MapComponent extends React.PureComponent {

    removeDate(date) {
        let separateDate = date.split(' ');
        let getHour = separateDate[1];
        return getHour;
    }

    render() {

        const { dataTrip } = this.props;

        console.log(dataTrip);

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
                        <div className="timeTitle"><strong>Inicio:&nbsp; </strong></div>
                        <div className="timeArrivalData">{this.removeDate(dataTrip.dts_preds.att)} &nbsp;</div>
                        <div className="timeTitle"><strong>Llegada:&nbsp; </strong></div>
                        <div className="timeDepartureData">{this.removeDate(dataTrip.dts_preds.done)}</div>
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
