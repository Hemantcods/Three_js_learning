import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Set up the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const canvas=document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas,antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);


camera.position.z = 5;

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;


// add HDRI lighting
new HDRLoader()
  .load('./hrdr_light.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
  });


// gltf model loading
const loader = new GLTFLoader();
loader.load('./wooden_box.glb', function (gltf) {
  const model = gltf.scene;
  scene.add(model);
});


// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
