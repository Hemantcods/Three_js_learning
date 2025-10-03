import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'lil-gui';
// scene
let scene = new THREE.Scene();

// camera
let camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 3;
scene.add(camera);


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

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// point light
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(2, 2, 2);
scene.add(pointLight);

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// lil-gui
const gui = new GUI();
const lightFolder = gui.addFolder('Lights');
const lightOptions = {
    Ambient: false,
    Directional: false,
    Point: true
};

lightFolder.add(lightOptions, 'Ambient').name('Ambient Light').onChange((value) => {
    if (value) scene.add(ambientLight);
    else scene.remove(ambientLight);
});
lightFolder.add(lightOptions, 'Directional').name('Directional Light').onChange((value) => {
    if (value) scene.add(directionalLight);
    else scene.remove(directionalLight);
});
lightFolder.add(lightOptions, 'Point').name('Point Light').onChange((value) => {
    if (value) scene.add(pointLight);
    else scene.remove(pointLight);
});

gui.add(mesh.position, "x", -3, 3, 0.01).name("position x");
gui.add(mesh.position, "y", -3, 3, 0.01).name("position y");
gui.add(mesh.position, "z", -3, 3, 0.01).name("position z");
gui.add(mesh, "visible");
gui.add(material, "wireframe");

// clock
const clock = new THREE.Clock();
// animation
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();