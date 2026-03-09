import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 1. Scene Setup
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// 2. Lighting (Crucial for the r4xbot textures)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(5, 10, 5);
scene.add(spotLight);

camera.position.z = 4;

// 3. Load Your Specific Bot
const loader = new GLTFLoader();
let bot;

loader.load('bot.glb', (gltf) => {
    bot = gltf.scene;
    
    // Center the bot
    const box = new THREE.Box3().setFromObject(bot);
    const center = box.getCenter(new THREE.Vector3());
    bot.position.sub(center); 
    
    scene.add(bot);
    console.log("r4xbot loaded successfully");
}, 
(xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
}, 
(error) => {
    console.error('Error loading bot.glb. Ensure the file is in your root folder.', error);
});

// 4. Interactive Mouse Movement
let targetX = 0;
let targetY = 0;

window.addEventListener('mousemove', (event) => {
    // Normalizing mouse coordinates (-0.5 to 0.5)
    targetX = (event.clientX / window.innerWidth) - 0.5;
    targetY = (event.clientY / window.innerHeight) - 0.5;
});

// 5. Animation Loop
function animate() {
    requestAnimationFrame(animate);

    if (bot) {
        // Smooth "Lerp" rotation (follows mouse with a slight delay)
        bot.rotation.y += (targetX * 0.8 - bot.rotation.y) * 0.05;
        bot.rotation.x += (targetY * 0.5 - bot.rotation.x) * 0.05;
        
        // Gentle floating idle animation
        bot.position.y = Math.sin(Date.now() * 0.002) * 0.1;
    }

    renderer.render(scene, camera);
}
animate();

// 6. Responsive Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
