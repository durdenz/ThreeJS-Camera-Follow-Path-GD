import * as THREE from 'three';
import { LoadGLTFByPath } from '../js/helpers/ModelHelper.js'
import { LoadGLBByPath } from '../js/helpers/ModelHelper.js'
import { getMixer } from '../js/helpers/ModelHelper.js' // G4 06225 Added for Animation
import PositionAlongPathState from '../js/positionAlongPathTools/PositionAlongPathState.js';
import { handleScroll, updatePosition } from '../js/positionAlongPathTools/PositionAlongPathMethods.js'
import { loadCurveFromJSON } from '../js/curveTools/CurveMethods.js'
import { setupRenderer } from '../js/helpers/RendererHelper.js'

// const startingModelPath = '../models/Scene.glb'
// const curvePathJSON = '../models/curvePath.json'
const startingModelPath = '../models/3DScene_TEST1.glb' // G4 06225 Added for Animation
const curvePathJSON = '../models/SplinePath_TEST1.json' // G4 06225 Added for Animation

setupScene();

async function setupScene() {

	//Scene is container for objects, cameras, and lights
	const scene = new THREE.Scene();

	await LoadGLBByPath(scene, startingModelPath);
	let mixer = getMixer();

	let curvePath = await loadCurveFromJSON(scene, curvePathJSON);

	// Comment to remove curve visualization
	// scene.add(curvePath.mesh); 
	
	// Create a camera and set its position and orientation
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	// camera.position.set(6, 3, 10);
	camera.position.copy(curvePath.curve.getPointAt(0))
	camera.lookAt(curvePath.curve.getPointAt(0.99))

	// Add the camera to the scene
	scene.add(camera);
	const renderer = setupRenderer();

	let positionAlongPathState = new PositionAlongPathState();

	// ========================================
	// 061825 G4 Changed onMouseScroll to isolate scroll thru scene to when top of canvas reaches top of viewport

	// Setup Event Listener for Scrolling inside canvas
	let SplineCanvas = document.querySelector('#spline-path-canvas');

	window.addEventListener('wheel', onMouseScroll, false);

	function onMouseScroll(event){
		if(SplineCanvas.getBoundingClientRect().top <= 0) {
			console.log(`MouseScroll: SplineCanvas.top = ${SplineCanvas.getBoundingClientRect().top}`);
			handleScroll(event, positionAlongPathState);
		}
	}
	// 061825 G4 End of Changes
	// ========================================
	
	// 062225 - G4 Beginning of Changes for Animation
	const clock = new THREE.Clock();
	// 062225 - G4 End of Changes for Animation

	// Animate the scene
	function animate() {
		requestAnimationFrame(animate);
		updatePosition(curvePath, camera, positionAlongPathState);
		// 062225 - G4 Beginning of Changes for Animation
		if(mixer) {
        	mixer.update(clock.getDelta());
		}
		// 062225 - G4 End of Changes for Animation
		renderer.render(scene, camera);
	}
	animate();
// 062225 - G4 Beginning of Changes for Animation
	renderer.setAnimationLoop(animate);
// 062225 - G4 End of Changes for Animation
};