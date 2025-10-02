import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'lil-gui';
// scene
let scene = new THREE.Scene();

// camera
let camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

// light
let light1 = new THREE.DirectionalLight(0xffffff,5);
let light2 = new THREE.DirectionalLight(0xffffff,5);
light1.position.set(5, 10, 7.5);
light2.position.set(-5, -10, -7.5);
scene.add(light1);
scene.add(light2);



// mesh(geometry and material)
let geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
let material = new THREE.MeshStandardMaterial({ side:THREE.DoubleSide });
let mesh = new THREE.Mesh(geometry, material);



// load texture
let textureLoader = new THREE.TextureLoader();
let texture = textureLoader.load("./public/texture/wood.jpg");
material.map = texture;


mesh.position.x = 0;
mesh.position.y = 0;
mesh.position.z = 0;
scene.add(mesh);

// renderer
const canvas = document.querySelector("canvas");
let renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// lil-gui
const gui = new GUI();
gui.add(mesh.position, "x", -3, 3, 0.01).name("position x");
gui.add(mesh.position, "y", -3, 3, 0.01).name("position y");
gui.add(mesh.position, "z", -3, 3, 0.01).name("position z");
gui.add(mesh, "visible");
gui.add(material, "wireframe");
const light1Folder = gui.addFolder("light1");
light1Folder.add(light1.position, "x", -10, 10, 0.01).name("position x");

// clock
const clock = new THREE.Clock();
// animation
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();