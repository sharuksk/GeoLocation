import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '1000px',
  height: '500px'
};

const center = {
  lat: 25.2867,
  lng: 51.5333
};

function MyMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBWWUSbZvw3k4XBYVhoGKPaqnSQ0E-DN90"
  })

  const [map, setMap] = React.useState(null)
  console.log(map);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
    console.log(map);
  }, [])


  return isLoaded ? (
    <body>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
      </body>
  ) : <></>
}

export default React.memo(MyMap)