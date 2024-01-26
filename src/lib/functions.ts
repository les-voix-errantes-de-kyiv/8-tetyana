import { type WebGLRenderer } from 'three';
import {
	sceneStore,
	cameraStore,
	ambientLightStore,
	gltfLoaderStore,
	islandMeshStore,
	islandAndSceneGroupStore,
	scenesContentStore,
	currentSceneIndexStore,
	plateformeMeshStore1,
	plateformeMeshStore2,
	plateformeMeshStore3,
	plateformeMeshStore4,
	spotLightStore,
	dracoLoaderStore,
	aboutSceneStore,
	aboutIslandMeshStore,
	aboutIslandMeshGroupStore,
	aboutPlateformeMeshStore1,
	aboutPlateformeMeshStore2,
	aboutPlateformeMeshStore3,
	aboutPlateformeMeshStore4
} from '$lib/stores';
import { get } from 'svelte/store';
import gsap from 'gsap';
import * as THREE from 'three';

const scene = get(sceneStore);
const camera = get(cameraStore);
const ambientLight = get(ambientLightStore);
const spotLight = get(spotLightStore);
const islandMesh = get(islandMeshStore);
const plateformeMesh1 = get(plateformeMeshStore1);
const plateformeMesh2 = get(plateformeMeshStore2);
const plateformeMesh3 = get(plateformeMeshStore3);
const plateformeMesh4 = get(plateformeMeshStore4);
const islandAndSceneGroup = get(islandAndSceneGroupStore);
const sceneContent = get(scenesContentStore);

const aboutScene = get(aboutSceneStore);
const aboutIslandMesh = get(aboutIslandMeshStore);
const aboutIslandMeshGroup = get(aboutIslandMeshGroupStore);
const aboutPlateformeMesh1 = get(aboutPlateformeMeshStore1);
const aboutPlateformeMesh2 = get(aboutPlateformeMeshStore2);
const aboutPlateformeMesh3 = get(aboutPlateformeMeshStore3);
const aboutPlateformeMesh4 = get(aboutPlateformeMeshStore4);

export const initCameraScene = (isAboutScene: boolean) => {
	camera.position.set(32, 13, -3);
	if (isAboutScene) {
		camera.lookAt(aboutIslandMesh.position);
		return;
	}
	camera.lookAt(islandMesh.position);
};

export function zoomCamera() {
	camera.position.set(25, 8.8, 0);
	camera.lookAt(islandMesh.position);
}

export function resize(renderer: WebGLRenderer) {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}

export function initObjectScene(isAboutPage: boolean) {
	if (isAboutPage) {
		aboutScene.add(ambientLight);
		aboutScene.add(spotLight);
		initCameraScene(isAboutPage);
		return;
	}
	scene.add(ambientLight);
	scene.add(spotLight);
	initCameraScene(isAboutPage);
}

export function loadModel(isAboutPage: boolean) {
	const gltfLoader = get(gltfLoaderStore);
	const dracoLoader = get(dracoLoaderStore);
	dracoLoader.setDecoderPath('/draco/');
	dracoLoader.preload();
	gltfLoader.setDRACOLoader(dracoLoader);

	gltfLoader.load('/assets/Island.glb', (gltf) => {
		const sceneGLTF = gltf.scene;
		if (isAboutPage) {
			aboutIslandMesh.add(sceneGLTF);
		} else {
			islandMesh.add(sceneGLTF);
		}
	});
	gltfLoader.load('/assets/Plateforme_1.glb', (gltf) => {
		const sceneGLTF = gltf.scene;
		if (isAboutPage) {
			aboutPlateformeMesh1.add(sceneGLTF);
		} else {
			plateformeMesh1.add(sceneGLTF);
		}
	});
	gltfLoader.load('/assets/Plateforme_2.glb', (gltf) => {
		const sceneGLTF = gltf.scene;
		if (isAboutPage) {
			aboutPlateformeMesh2.add(sceneGLTF);
		} else {
			plateformeMesh2.add(sceneGLTF);
		}
	});
	gltfLoader.load('assets/Plateforme_3.glb', (gltf) => {
		const sceneGLTF = gltf.scene;
		if (isAboutPage) {
			aboutPlateformeMesh3.add(sceneGLTF);
		} else {
			plateformeMesh3.add(sceneGLTF);
		}
	});
	gltfLoader.load('/assets/Plateforme_4.glb', (gltf) => {
		const sceneGLTF = gltf.scene;
		if (isAboutPage) {
			aboutPlateformeMesh4.add(sceneGLTF);
		} else {
			plateformeMesh4.add(sceneGLTF);
		}
	});
}

export function makeGroup(isAboutPage: boolean) {
	if (isAboutPage) {
		aboutIslandMeshGroup.add(aboutIslandMesh);
		aboutIslandMeshGroup.add(aboutPlateformeMesh1);
		aboutIslandMeshGroup.add(aboutPlateformeMesh2);
		aboutIslandMeshGroup.add(aboutPlateformeMesh3);
		aboutIslandMeshGroup.add(aboutPlateformeMesh4);
		aboutScene.add(aboutIslandMeshGroup);
		return;
	}
	islandAndSceneGroup.add(islandMesh);
	islandAndSceneGroup.add(plateformeMesh1);
	islandAndSceneGroup.add(plateformeMesh2);
	islandAndSceneGroup.add(plateformeMesh3);
	islandAndSceneGroup.add(plateformeMesh4);
	scene.add(islandAndSceneGroup);
}

export function rotateScene() {
	gsap.to(islandAndSceneGroup.rotation, {
		y: Math.PI * -0.5 + islandAndSceneGroup.rotation.y,
		duration: 1,
		ease: 'power2.inOut'
	});
	zoomCamera();
	onPressRight();
	camera.lookAt(islandMesh.position);
}

export function unRotateScene() {
	gsap.to(islandAndSceneGroup.rotation, {
		y: Math.PI * 0.5 + islandAndSceneGroup.rotation.y,
		duration: 1,
		ease: 'power2.inOut'
	});
	zoomCamera();
	camera.lookAt(islandMesh.position);
	onPressLeft();
}

export function particles() {
	const particlesGeometry = new THREE.BufferGeometry();
	const count = 500;
	const minDistance = 20;

	const positions = new Float32Array(count * 3);

	for (let i = 0; i < count * 3; i += 3) {
		let x, y, z;

		do {
			x = (Math.random() - 0.5) * 50;
			y = (Math.random() - 0.5) * 50;
			z = (Math.random() - 0.5) * 50;
		} while (Math.sqrt(x * x + y * y + z * z) < minDistance);

		positions[i] = x;
		positions[i + 1] = y;
		positions[i + 2] = z;
	}

	particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

	const particlesMaterial = new THREE.PointsMaterial({
		size: 0.1,
		sizeAttenuation: true
	});

	const particles = new THREE.Points(particlesGeometry, particlesMaterial);
	scene.add(particles);
}

function onPressRight() {
	const currentSceneIndex = get(currentSceneIndexStore);

	if (currentSceneIndex === sceneContent.length - 1) {
		currentSceneIndexStore.set(0);
		return;
	}
	currentSceneIndexStore.update((index) => index + 1);
}

function onPressLeft() {
	const currentSceneIndex = get(currentSceneIndexStore);
	if (currentSceneIndex === 0) {
		currentSceneIndexStore.set(sceneContent.length - 1);
		return;
	}
	currentSceneIndexStore.update((index) => index - 1);
}

export function removeIslandFromScene() {
	islandMesh.removeFromParent();
	plateformeMesh1.removeFromParent();
	plateformeMesh2.removeFromParent();
	plateformeMesh3.removeFromParent();
	plateformeMesh4.removeFromParent();
	islandAndSceneGroup.removeFromParent();
}
