import { Scene, PerspectiveCamera, Mesh, AmbientLight, Group } from 'three';
import { readable, writable } from 'svelte/store';
import { geometryBox, material } from '$lib/objects';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const sceneStore = writable(new Scene());
export const cameraStore = writable(
	new PerspectiveCamera(
		75,
		typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 0,
		1,
		1000
	)
);
export const boxStore = writable(new Mesh(geometryBox, material));
export const ambientLightStore = writable(new AmbientLight(0xffffff));
export const gltfLoaderStore = writable(new GLTFLoader());
export const islandAndSceneGroupStore = writable(new Group());
export const planeMeshStore = writable(new Mesh());
export const islandMeshStore = writable(new Mesh());
export const sceneMeshStore = writable(new Mesh());
export const scenesContentStore = readable<{ title: string }[]>([
	{ title: 'scene 1' },
	{ title: 'scene 2' },
	{ title: 'scene 3' },
	{ title: 'scene 4' }
]);
export const currentSceneIndexStore = writable(0);
