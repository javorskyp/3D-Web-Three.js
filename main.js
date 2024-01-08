import * as THREE from 'three';
import './style.css';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from 'gsap';

const scene = new THREE.Scene();

//Create sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#ffffff",
})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//Size

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

//Light
const light = new THREE.PointLight(0xFFFFFF, 70, 100, 1.7);
light.position.set(0, 10, 10)
scene.add(light)

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height , 0.1, 100)
camera.position.z = 20;
scene.add(camera)

//Renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping =  true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

// Resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //Camera update
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

// Timeline GSAP

const timeLine1 = gsap.timeline({defaults: {duration: 1}}) 
timeLine1.from.To(mesh.scale, {z: 0, x: 0, y: 0}, {z:1, x:1, y:1})

