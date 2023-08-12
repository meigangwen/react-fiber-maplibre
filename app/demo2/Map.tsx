import React, { useEffect } from 'react'
import maplibregl from 'maplibre-gl'

export default function Map(props) {
    
    useEffect(() => {
        const map = new maplibregl.Map({
            style: 'https://api.maptiler.com/maps/basic/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
           
            center: [props.lat, props.lon], 
            zoom: props.zoom,
            pitch: props.pitch,
           //bearing: -17.6,
            container: 'map',
            antialias: true
        })

        // parameters to ensure the model is georeferenced correctly on the map
        const modelOrigin = [148.9819, -35.39847]
        const modelAltitude = 0
        const modelRotate = [Math.PI / 2, 0, 0]

        const modelAsMercatorCoordinate = maplibregl.MercatorCoordinate.fromLngLat(
            modelOrigin,
            modelAltitude
        )

        // transformation parameters to position, rotate and scale the 3D model onto the map
        const modelTransform = {
            translateX: modelAsMercatorCoordinate.x,
            translateY: modelAsMercatorCoordinate.y,
            translateZ: modelAsMercatorCoordinate.z,
            rotateX: modelRotate[0],
            rotateY: modelRotate[1],
            rotateZ: modelRotate[2],
            /* Since our 3D model is in real world meters, a scale transform needs to be
            * applied since the CustomLayerInterface expects units in MercatorCoordinates.
            */
            scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
        }

        

      }, [])

    return (
        <div id="map"></div>
    )
}