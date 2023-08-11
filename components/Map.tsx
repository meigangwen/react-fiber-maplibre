import React, { useEffect } from 'react'

export default function Map() {
    
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/maplibre-gl@3.3.0/dist/maplibre-gl.js'
        script.async = true;
        document.head.appendChild(script);
    
        script.onload = () => {
            const map = new maplibregl.Map({
                style:'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
                center: [-74.0066, 40.7135],
                zoom: 15.5,
                pitch: 45,
                bearing: -17.6,
                container: 'map',
                antialias: true
            })

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
                            'fill-extrusion-opacity': 0.6
                        }
                    },
                    labelLayerId
                )
            })
        }
      }, [])

    return (
        <div id="map"></div>
    )
}