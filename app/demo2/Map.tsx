import React, { useEffect } from 'react'
import maplibregl from 'maplibre-gl'

export default function Map(props) {
    
    useEffect(() => {
        const map = new maplibregl.Map({
            style: {
                'id': 'raster',
                'version': 8,
                'name': 'Raster tiles',
                'center': [0, 0],
                'zoom': 0,
                'sources': {
                    'raster-tiles': {
                        'type': 'raster',
                        'tiles': ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                        'tileSize': 256,
                        'minzoom': 0,
                        'maxzoom': 19
                    }
                },
                'layers': [
                    {
                        'id': 'background',
                        'type': 'background',
                        'paint': {
                            'background-color': '#e0dfdf'
                        }
                    },
                    {
                        'id': 'simple-tiles',
                        'type': 'raster',
                        'source': 'raster-tiles'
                    }
                ]
            },
           
            center: [props.lat, props.lon], 
            zoom: props.zoom,
            pitch: props.pitch,
           //bearing: -17.6,
            container: 'map',
            antialias: true
        })

        /*
        map.on('load', () => {
            const layers = map.getStyle().layers;
    
            let labelLayerId;
            for (let i = 0; i < layers.length; i++) {
                if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                    labelLayerId = layers[i].id;
                    break;
                }
            }
    
            map.addLayer(
                {
                    'id': '3d-buildings',
                    'source': 'openmaptiles',
                    'source-layer': 'building',
                    'filter': ['==', 'extrude', 'true'],
                    'type': 'fill-extrusion',
                    'minzoom': 15,
                    'paint': {
                        'fill-extrusion-color': '#aaa',
                        'fill-extrusion-height': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'height']
                        ],
                        'fill-extrusion-base': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'min_height']
                        ],
                        'fill-extrusion-opacity': 0
                    }
                },
                labelLayerId
            )
        })*/
      }, [])

    return (
        <div id="map"></div>
    )
}