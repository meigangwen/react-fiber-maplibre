'use client'

import { Stats, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

export default function App() {
  return (
    <Canvas camera={{ position: [-8, 5, 8] }}>
      <OrbitControls target={[0, 1, 0]} maxPolarAngle={Math.PI / 2} />
      <axesHelper args={[5]} />
      <gridHelper />
      <Stats />
    </Canvas>
  )
}