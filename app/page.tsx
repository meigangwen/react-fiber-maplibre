'use client';

import { Map, MapProps } from "@/components/Map";

export default function Home() {
  const mapProps: MapProps = {
    lat: 103.76441744947748,
    lon: 1.313969662500482,
    zoom: 15.5,
    pitch: 45,
  };

  return <Map {...mapProps} />;
}
