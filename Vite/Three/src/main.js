import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// scene
let scene = new THREE.Scene();

// camera
let camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

// mesh(geometry and material)
let geometry = new THREE.SphereGeometry( 1,10,10 ); 
let material = new THREE.MeshBasicMaterial({ color: "green" , wireframe: true });
let mesh = new THREE.Mesh(geometry, material);

mesh.position.x = 0;
mesh.position.y = 0;
mesh.position.z = 0;
scene.add(mesh);

// renderer
const canvas = document.querySelector("canvas");
let renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// clock
const clock = new THREE.Clock();
// animation
function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x = clock.getElapsedTime() * 0.5;
    mesh.rotation.y = clock.getElapsedTime() * 0.5;
    mesh.rotation.z = clock.getElapsedTime() * 0.5;
    renderer.render(scene, camera);
}
animate();