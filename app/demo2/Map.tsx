import React, { useEffect } from 'react'
import maplibregl from 'maplibre-gl'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

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

        // configuration of the custom layer for a 3D model per the CustomLayerInterface
        const customLayer = {
            id: '3d-model',
            type: 'custom',
            renderingMode: '3d',
            onAdd (map, gl) {
                this.camera = new THREE.Camera()
                this.scene = new THREE.Scene()

                // create two three.js lights to illuminate the model
                const directionalLight = new THREE.DirectionalLight(0xffffff)
                directionalLight.position.set(0, -70, 100).normalize()
                this.scene.add(directionalLight)

                const directionalLight2 = new THREE.DirectionalLight(0xffffff)
                directionalLight2.position.set(0, 70, 100).normalize()
                this.scene.add(directionalLight2)

                // use the three.js GLTF loader to add the 3D model to the three.js scene
                const loader = new GLTFLoader()
                loader.load(
                    'https://maplibre.org/maplibre-gl-js/docs/assets/34M_17/34M_17.gltf',
                    (gltf) => {
                        this.scene.add(gltf.scene)
                    }
                );
                this.map = map

                // use the MapLibre GL JS map canvas for three.js
                this.renderer = new THREE.WebGLRenderer({
                    canvas: map.getCanvas(),
                    context: gl,
                    antialias: true
                })

                this.renderer.autoClear = false
            },
            render (gl, matrix) {
                const rotationX = new THREE.Matrix4().makeRotationAxis(
                    new THREE.Vector3(1, 0, 0),
                    modelTransform.rotateX
                )
                const rotationY = new THREE.Matrix4().makeRotationAxis(
                    new THREE.Vector3(0, 1, 0),
                    modelTransform.rotateY
                )
                const rotationZ = new THREE.Matrix4().makeRotationAxis(
                    new THREE.Vector3(0, 0, 1),
                    modelTransform.rotateZ
                )

                const m = new THREE.Matrix4().fromArray(matrix);
                const l = new THREE.Matrix4()
                    .makeTranslation(
                        modelTransform.translateX,
                        modelTransform.translateY,
                        modelTransform.translateZ
                    )
                    .scale(
                        new THREE.Vector3(
                            modelTransform.scale,
                            -modelTransform.scale,
                            modelTransform.scale
                        )
                    )
                    .multiply(rotationX)
                    .multiply(rotationY)
                    .multiply(rotationZ)

                this.camera.projectionMatrix = m.multiply(l)
                this.renderer.resetState()
                this.renderer.render(this.scene, this.camera)
                this.map.triggerRepaint()
            }
        }

        map.on('style.load', () => {
            map.addLayer(customLayer);
        })
      }, [])

    return (
        <div id="map"></div>
    )
}