import React from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'

const options = {
  zoomControlOptions: {
    position: google.maps.ControlPosition.RIGHT_CENTER // ,
    // ...otherOptopns
  }
}

function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "YOUR_API_KEY" // ,
    // ...otherOptions
  })

  const renderMap = () => {
    // wrapping to a function is useful in case you want to access `window.google`
    // to eg. setup options or create latLng object, it won't be available otherwise
    // feel free to render directly if you don't need that
    const onLoad = React.useCallback(
      function onLoad (mapInstance) {
        // do something with map Instance
      }
    )
    return <GoogleMap
      options={options}
      onLoad={onLoad}
    >
      {
        // ...Your map components
      }
    </GoogleMap>
  }

  if (loadError) {
    return <div>Disculpe, no se puede mostrar el mapa ahora.</div>
  }

  return isLoaded ? renderMap() : <></>
}