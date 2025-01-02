import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useState, useCallback } from "react";
import { mapOption } from "./mapcredentials";


// const containerStyle = {
//     width: '400px',
//     height: '400px',
// }

// const center = {
//     lat: 43.1394,
//     lng: 80.2636,
// }

const Map = () => {
    const { isLoaded } = useJsApiLoader({
        id: mapOption.googleMapApiKey,
        googleMapsApiKey: mapOption.googleMapApiKey,
    });

    // const [map, setMap] = useState(null)

    // const onLoad = useCallback(function callback(map) {
    //     // This is just an example of getting and using the map instance!!! don't just blindly copy!
    //     const bounds = new window.google.maps.LatLngBounds(center)
    //     map.fitBounds(bounds)

    //     setMap(map)
    // }, [])


    return (
        // isLoaded && (
        //     <>
        //         <GoogleMap
        //             mapContainerStyle={containerStyle}
        //             center={center}
        //             zoom={10}
        //         >
        //         </GoogleMap>
        //     </>
        // )
        <iframe
            width="450"
            height="450"
            style={{border:"0"}}
            loading="lazy"
            allowfullscreen
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCgXytgbiFKaAPMmUypVh43ueYUZAG0SO0&q=senior+assisted+care+near+me&zoom=9">
        </iframe>
    );
};
export default Map;