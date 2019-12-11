
import { store } from '../../../store/configStore';
import PostLocations from './PostLocations';

function StartWatchingLocations (cuil) {

    var geo = navigator.geolocation;
    var position = '';
    var accuracy = '';

    /* Verify Geolocation device */

    if (geo) {
        store.dispatch({type: 'GEO_ACTIVE', payload: true});
    } else {
        alert('El dispositivo no soporta Geolocalización');
    }

    /* Listen to Geo Watch changes */

    const onChange = ({coords}) => {
        console.log(coords.accuracy);
        store.dispatch({type: 'SET_COORDS', payload: {lat: coords.latitude, lon: coords.longitude, accuracy: coords.accuracy}})
        position = {
            latitude: coords.latitude,
            longitude: coords.longitude,
            accuracy: coords.accuracy
        }
    };

    geo.watchPosition(onChange, watchError, {
        enableHighAccuracy: true,
        timeout: 9000,
        maximumAge: 0
    });

    setInterval(() => {
        PostLocations(cuil, position);
    }, 14000);

    function watchError() {
        console.log('Hubo un error al rastrear la posición');
    }

}

export default StartWatchingLocations;
