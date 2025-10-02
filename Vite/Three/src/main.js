import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// scene
let scene = new THREE.Scene();

// camera
let camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

// mesh(geometry and material)
let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({ color: "white", wireframe: true });
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

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
})

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// clock
const clock = new THREE.Clock();
// animation
function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x = clock.getElapsedTime() * 0.5;
    controls.update();
    renderer.render(scene, camera);
}
animate();