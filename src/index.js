import './styles/main.scss';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ____ Debug

const gui = new dat.GUI();

// ____ Loading
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('./img/texture_6.jpeg');
const normalTextureSecond = textureLoader.load('./img/texture_5.jpeg');

// ____ Canvas
const canvas = document.querySelector('.webgl');
const canvasSecond = document.querySelector('.webgl-second');

// ____ Scene
const scene = new THREE.Scene();
const sceneSecond = new THREE.Scene();

// ____ Scene Fog
{
	const near = 1;
	const far = 25;
	const color = 0x232323;
	scene.fog = new THREE.Fog(color, near, far);

	const nearSecond = 1;
	const farSecond = 4;
	const colorSecond = 0x232323;
	sceneSecond.fog = new THREE.Fog(colorSecond, nearSecond, farSecond);
}

// ____ Stars
// const starTexture = textureLoader.load('./img/texture_2.png');
var stars = [];

function getRandom() {
	var num = Math.floor(Math.random() * 10) + 1;
	num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
	return num;
}

for (let i = 0; i < 200; i++) {
	let geometry = new THREE.SphereBufferGeometry(0.04, 8, 8);
	// let material = new THREE.MeshBasicMaterial({ map: starTexture });
	let material = new THREE.MeshBasicMaterial();
	material.color = new THREE.Color(0xffffff);
	material.fog = true;

	let star = new THREE.Mesh(geometry, material);
	star.position.set(getRandom(), getRandom(), getRandom());
	star.material.side = THREE.DoubleSide;
	stars.push(star);
}

for (let j = 0; j < stars.length; j++) {
	scene.add(stars[j]);
}

for (let k = 0; k < stars.length; k++) {
	let star = stars[k];
	star.rotation.x += 0.01;
	star.rotation.y += 0.01;
}

var rotSpeed = 0.001;

// ____ Objects
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);
const geometrySecond = new THREE.TorusKnotBufferGeometry(0.5, 0.2, 128, 16);

// ____ Materials
const material = new THREE.MeshStandardMaterial();
// material.metalness = 4;
// material.roughness = 0.2;
// material.wireframe = true;
material.normalMap = normalTexture;
material.color = new THREE.Color(0xffffff);
// material.color = new THREE.Color(0x54f0d1);

const materialSecond = new THREE.MeshBasicMaterial({color: 0x73ffe3});
materialSecond.fog = true;

// ____ Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const torusKnot = new THREE.Mesh(geometrySecond, materialSecond);
sceneSecond.add(torusKnot);
// ____ Lights

const lightColor = { color: 0xffff };
const light = new THREE.PointLight(lightColor.color, 0.9);
light.position.x = 11;
light.position.y = 93;
light.position.z = 86;
scene.add(light);

const guiLightOneFolder = gui.addFolder('Light 1');
guiLightOneFolder.add(light.position, 'x').min(-100).max(100);
guiLightOneFolder.add(light.position, 'y').min(-100).max(100);
guiLightOneFolder.add(light.position, 'z').min(-100).max(100);
guiLightOneFolder.add(light, 'intensity').min(0).max(10).step(0.01);
guiLightOneFolder.addColor(lightColor, 'color').onChange(() => {
	light.color.set(lightColor.color);
});

// --another notation
const lightSecondaryColor = { color: 0x65d365 };

const lightSecondary = new THREE.PointLight(lightSecondaryColor.color);
lightSecondary.intensity = 1.7;
lightSecondary.position.set(56, -40, -20);
// scene.add(lightSecondary);

gui.add(lightSecondary.position, 'x').min(-100).max(100);
gui.add(lightSecondary.position, 'y').min(-100).max(100);
gui.add(lightSecondary.position, 'z').min(-100).max(100);
gui.add(lightSecondary, 'intensity').min(0).max(10).step(0.01);
gui.addColor(lightSecondaryColor, 'color').onChange(() => {
	lightSecondary.color.set(lightSecondaryColor.color);
});

const pointLightHelper = new THREE.PointLightHelper(lightSecondary, 10);
scene.add(pointLightHelper);

// ____ Sizes

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

// ____ Camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);
sceneSecond.add(camera);

// ____ Renderer

const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const rendererSecond = new THREE.WebGL1Renderer({canvas: canvasSecond, alpha: true});
rendererSecond.setSize(sizes.width, sizes.height);
rendererSecond.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// ____ Animation

const clock = new THREE.Clock();

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function mouseMoveAnimate(e) {
	mouseX = e.clientX - windowHalfX;
	mouseY = e.clientY - windowHalfY;
}

const h1 = document.querySelector('h1');
const textContent = document.querySelector('.text-content');

function mouseScrollAnimate() {
	sphere.position.y = window.scrollY * 0.0015;
	torusKnot.position.y = window.scrollY * 0.0015 - 1.7;
	torusKnot.opacity = 0;

	textContent.style.transform = `translateY(-${window.scrollY * 0.8 - 800}%)`;
	textContent.style.opacity = `${(window.scrollY * 0.003) - 2}`;

	h1.style.transform = `translateX(-${window.scrollY * 0.15}%)`;
	h1.style.opacity = `${1-(window.scrollY * 0.003)}`;
}

document.addEventListener('mousemove', (e) => mouseMoveAnimate(e));
document.addEventListener('scroll', (e) => mouseScrollAnimate(e));

function animate() {
	// --auto rotating

	const elapsedTime = clock.getElapsedTime();
	sphere.rotation.y = 1 * elapsedTime;
	torusKnot.rotation.x = 0.2 * elapsedTime;

	// sphere.rotation.y += 0.01;
	// sphere.rotation.x += 0.01;
	sphere.rotation.z += 0.01;

	// --moving camera by mouse
	targetX = mouseX * 0.001;
	targetY = mouseY * 0.001;

	sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
	sphere.rotation.x += 0.5 * (targetY - sphere.rotation.x);

	sphere.scale.x += -0.8 * (targetY - sphere.rotation.x);
	sphere.scale.y += -0.8 * (targetY - sphere.rotation.x);
	sphere.scale.z += -0.8 * (targetY - sphere.rotation.x);

	renderer.render(scene, camera);
	rendererSecond.render(sceneSecond, camera);

	// -- rotating scene
	let x = camera.position.x;
	let z = camera.position.z;
	camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
	camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
	camera.lookAt(scene.position);

	window.requestAnimationFrame(animate);
}
animate();

// ____ Resizing

window.addEventListener('resize', () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	rendererSecond.setSize(sizes.width, sizes.height);
	rendererSecond.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
