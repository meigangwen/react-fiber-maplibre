import React, { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import { Canvas } from '@react-three/fiber'

export default function Map(props) {

    const canvasRef = useRef()
    
    useEffect(() => {
        const map = new maplibregl.Map({
            style: 'https://tileserver.yilumi.com/styles/prod-singapore-maptiler-streets-style/style.json',
            //style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
            center: [props.lat, props.lon], 
            zoom: props.zoom,
            pitch: props.pitch,
           //bearing: -17.6,
            container: canvasRef.current,
            antialias: true
        })

        map.showTileBoundaries = true
        
        map.on('load', () => {
            const layers = map.getStyle().layers;
    
            let labelLayerId;
            for (let i = 0; i < layers.length; i++) {
                if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                    labelLayerId = layers[i].id;
                    break;
                }
            }
    
            /*
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
                        'fill-extrusion-opacity': 1.0
                    }
                },
                labelLayerId
            )*/
        })
        canvasRef.current.gl = map.getCanvas().getContext("webgl2")
        
      }, [])

    return (
        <Canvas 
            ref={canvasRef}
            
        >
        </Canvas>
    )
}