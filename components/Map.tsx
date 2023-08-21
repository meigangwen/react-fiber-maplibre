import React, { useEffect } from 'react'
import maplibregl from 'maplibre-gl'

export type MapProps = {
    lat: number;
    lon: number;
    zoom: number;
    pitch: number;
};

export function Map(props: MapProps) {

    useEffect(() => {
        const map = new maplibregl.Map({
            style: 'https://tileserver.yilumi.com/styles/prod-singapore-maptiler-streets-style/style.json',
            center: [props.lat, props.lon],
            zoom: props.zoom,
            pitch: props.pitch,
            container: 'map',
            antialias: true
        })
        // map.showCollisionBoxes = true;
        map.showTileBoundaries = true;
        map.showPadding = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // only run once

    return (
        <div id="map"></div>
    )
}