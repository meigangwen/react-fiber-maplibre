'use client'

import Map from "./Map"
export default function Home() {

  return (
    <Map
      lat={148.9819}
      lon={-35.3981}
      zoom={18}
      pitch={60} 
  />
  )
}