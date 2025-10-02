import * as THREE from "three";
// scene
let scene = new THREE.Scene();

// camera
let camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

// mesh(geometry and material)
let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({ color: "white" });
let mesh = new THREE.Mesh(geometry, material);

mesh.position.x =0;
mesh.position.y =0;
mesh.position.z =0;
scene.add(mesh);

// renderer
const canvas = document.querySelector("canvas");
let renderer = new THREE.WebGLRenderer({ canvas,antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);


const clock = new THREE.Clock();
// animation
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x = clock.getElapsedTime() * 0.5;

  renderer.render(scene, camera);
}
animate();