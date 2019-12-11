/* global google */
import React, { Component } from 'react'
import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api'
const MapStyles = require("./mapStyles.json");

class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            response: null,
            travelMode: 'DRIVING',
            origin: '',
            destination: ''
        }
        this.directionsCallback = this.directionsCallback.bind(this)
        this.checkDriving = this.checkDriving.bind(this)
        this.getOrigin = this.getOrigin.bind(this)
        this.getDestination = this.getDestination.bind(this)
        this.onClick = this.onClick.bind(this)
        this.onMapClick = this.onMapClick.bind(this)
    }

    componentDidMount() {
        this.onClick()
    }


    directionsCallback(response) {
        console.log(response)
        if (response !== null) {
            if (response.status === 'OK') {
                this.setState(
                    () => ({ response })
                )
            } else {
                console.log('response: ', response)
            }
        }
    }

    checkDriving({ target: { checked } }) {
        checked &&
            this.setState(
                () => ({
                    travelMode: 'DRIVING'
                })
            )
    }

    getOrigin(ref) {
        this.origin = ref
    }

    getDestination(ref) {
        this.destination = ref
    }

    onClick() {
        this.setState(
            () => ({
                origin: "Melian 2000",
                destination: "Melian 4000"
            })
        )
    }

    onMapClick(...args) {
        console.log('onClick args: ', args)
    }

    render() {
        return (
            <div className='map'>
                <div className='map-container'>
                    <GoogleMap
                        // required
                        id='travel-id'
                        // required
                        mapContainerStyle={{
                            height: '40vh',
                            width: '80vw'
                        }}
                        options={{
                            styles: MapStyles,
                            streetViewControl: false,
                            scaleControl: false,
                            mapTypeControl: false,
                            panControl: false,
                            zoomControl: false,
                            rotateControl: false,
                            fullscreenControl: false
                        }}
                        // required
                        zoom={8}
                        // required
                        center={{ lat: -34.6615176, lng: -58.5034847 }}
                        // optional
                        onClick={this.onMapClick}
                        // optional
                        onLoad={map => {
                            console.log('DirectionsRenderer onLoad map: ', map)
                        }}
                        // optional
                        onUnmount={map => {
                            console.log('DirectionsRenderer onUnmount map: ', map)
                        }} >
                        {
                            (
                                this.state.destination !== '' &&
                                this.state.origin !== ''
                            ) && (
                                <DirectionsService
                                    // required
                                    options={{
                                        destination: this.props.destination,
                                        origin: this.props.origin,
                                        travelMode: "DRIVING"
                                    }}
                                    // required
                                    callback={this.directionsCallback}
                                    // optional
                                    onLoad={directionsService => {
                                        console.log('DirectionsService onLoad directionsService: ', directionsService)
                                    }}
                                    // optional
                                    onUnmount={directionsService => {
                                        console.log('DirectionsService onUnmount directionsService: ', directionsService)
                                    }}
                                />
                            )
                        }
                        {
                            this.state.response !== null && (
                                <DirectionsRenderer
                                    // required
                                    options={{
                                        directions: this.state.response
                                    }}
                                    // optional
                                    onLoad={directionsRenderer => {
                                        console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                                    }}
                                    // optional
                                    onUnmount={directionsRenderer => {
                                        console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                                    }}
                                />
                            )
                        }
                    </GoogleMap>
                </div>
            </div>
        )
    }
}

export default Map

