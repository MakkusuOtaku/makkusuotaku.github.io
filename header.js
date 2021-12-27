const canvas = document.querySelector('canvas');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

import * as THREE from "https://cdn.skypack.dev/three@0.134.0";

const loader = new THREE.TextureLoader();
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
const scene = new THREE.Scene();

const renderDistance = 128;

scene.background = new THREE.Color(0x000000);
scene.fog = new THREE.Fog(0x000000, 0, renderDistance);

const camera = new THREE.PerspectiveCamera(60, canvas.width/canvas.height, 0.1, 1000);
camera.position.z = 5;
camera.position.y = 2;

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-5, 5, -5);
scene.add(light);

const light2 = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light2);

const terrainGeometry = new THREE.BufferGeometry();
const terrainMaterial = new THREE.MeshPhongMaterial({ color: 0x9900ff, wireframe: true });

const vertices = [];

for (let x = 0; x < renderDistance; x++) {
    for (let z = 0; z < renderDistance; z++) {
        vertices.push(...[
            x, 0, z,
            x, 0, z + 1,
            x + 1, 0, z + 1,
            x + 1, 0, z + 1,
            x + 1, 0, z,
            x, 0, z
        ]);
    }
}

terrainGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
terrainGeometry.computeVertexNormals();

const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
terrain.position.x = -renderDistance / 2;
terrain.position.z = -renderDistance+5;
scene.add(terrain);

// Create a blue cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0x0000ff });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(-5, 0.5, -8);
scene.add(cube);

// Move camera when page is scrolled
window.addEventListener('scroll', ()=>{
    //camera.position.y = -window.scrollY/128;
});

const nameElement = document.querySelector('#name');

nameElement.addEventListener('click', ()=>{
    // Do something interesting
});

/*
setInterval(() => {
    renderer.render(scene, camera);
}, 50);
//*/

renderer.render(scene, camera);