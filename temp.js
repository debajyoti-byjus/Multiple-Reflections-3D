import * as THREE from "./js/three.module.js";
// // console.log(THREE);
import { GLTFLoader } from './js/GLTFLoader.js';
import { OrbitControls } from './js/OrbitControls.js';
import { Reflector } from './js/Reflector.js';


const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();


let raylength = 4, m = 1, n = 1, radiusRatio = 0.6;
let arrow1Radius = 2, arrow2Radius = 2.2, beamCentreRadius = 2, laserPointerRadius = 5.25, normalOpacity = 1, planeOpacity = 0.5, angleArcOpacity = 1;
let sceneShiftX = 0;
let root1, root2, root3, footballModel, greenCuttingBoard, arrowModel2, arrowModel, normalDottedModel, scaleval = 0.8;
let roughness0 = 0, transmission1 = 0.9, thick1 = 0;



// loading
const loader = new GLTFLoader();
// ----------------------------------------------------------------------------------------------------------------
//---------------------------------------------Football------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------
loader.load("./assets/3D models glb/football.glb", function (glb) {
    footballModel = glb.scene;
    footballModel.position.set(1.2 + sceneShiftX, 0, 0);
    footballModel.scale.set(0.0004, 0.0004, 0.0004);
    footballModel.rotation.set(0, 0, 0);
    // footballModel.children[0].material = new THREE.MeshPhongMaterial({ color: 'red' });
    footballModel.children[0].castShadow = true;
    footballModel.children[0].receiveShadow = false;
    scene.add(footballModel);

}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + "%loaded");
}, function (error) {
    console.log(`An error occured`);
});

// ----------------------------------------------------------------------------------------------------------------
//---------------------------------------------Green Board---------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------
loader.load("./assets/3D models glb/green board-media.glb", function (glb) {
    greenCuttingBoard = glb.scene;
    greenCuttingBoard.position.set(3 + sceneShiftX, -2, 0);
    greenCuttingBoard.scale.set(6.5, 6.5, 6.5);
    greenCuttingBoard.rotation.set(0, 0, 0);
    // greenCuttingBoard.children[0].material = new THREE.MeshPhongMaterial({ color: 'red' });
    greenCuttingBoard.children[0].receiveShadow = true;
    greenCuttingBoard.children[0].castShadow = false;
    scene.add(greenCuttingBoard);
}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + "%loaded");
}, function (error) {
    console.log(`An error occured`);
});

// ----------------------------------------------------------------------------------------------------------------
//---------------------------------------------Mirror---------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------
const geometry = new THREE.PlaneGeometry(1, 1);
// const material = new THREE.MeshPhysicalMaterial({
//     reflectivity: 1.0,
//     transmission: 1,
//     roughness: 0,
//     metalness: 0,
//     clearcoat: 0.0,
//     clearcoatRoughness: 0,
//     color: new THREE.Color("#222222"),
//     ior: 1.5,
// });
// const plane = new THREE.Mesh(geometry, material);
let plane = new Reflector(geometry, {
    clipBias: 0,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0x777777,
});
plane.scale.set(3, 2.9, 1); //3,7,1
plane.rotation.set(Math.PI / 2, Math.PI / 2, 0);
plane.position.set(0 + sceneShiftX, 0.1, 0);
scene.add(plane);


let plane_2 = new Reflector(geometry, {
    clipBias: 0,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0x777777,
});

plane_2.scale.set(3, 2.9, 1);
// plane_2.rotation.set(0, 0, 0);
plane_2.position.set(1.5 + sceneShiftX, 0.1, 0);
scene.add(plane_2);





let plane_3 = new Reflector(geometry, {
    clipBias: 0,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0x777777,
});
plane_3.scale.set(3, 2.9, 1); //3,7,1
plane_3.rotation.set(Math.PI / 2, Math.PI / 2, 0);
plane_3.position.set(0 + sceneShiftX, 0.1, 0);
scene.add(plane_3);


let plane_4 = new Reflector(geometry, {
    clipBias: 0,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0x777777,
});

plane_4.scale.set(3, 2.9, 1);
// plane_4.rotation.set(0, 0, 0);
plane_4.position.set(1.5 + sceneShiftX, 0.1, 0);
scene.add(plane_4);





let geometry_mirror_back = new THREE.BoxGeometry(3.1, 3.1, 0.05);
let material_mirror_back = new THREE.MeshLambertMaterial({ color: "#333333" });

let plane_left = new THREE.Mesh(geometry_mirror_back, material_mirror_back);
// plane_left.scale.set(3, 7, 1); //3,7,1
plane_left.rotation.set(Math.PI / 2, 0, 0);
plane_left.position.set(0 + sceneShiftX, 0.1, 0);
scene.add(plane_left);


let plane_right = new THREE.Mesh(geometry_mirror_back, material_mirror_back);
// plane_right.scale.set(3, 7, 1); //3,7,1
plane_right.rotation.set(Math.PI / 2, 0, 0);
plane_right.position.set(0 + sceneShiftX, 0.1, 0);
scene.add(plane_right);

// let plane_right = new Reflector(geometry_mirror_back, material_mirror_back);
// plane_right.scale.set(3, 3, 3);
// plane_left.rotation.set(Math.PI / 2, Math.PI / 2, 0);
// plane_right.position.set(1.5 + sceneShiftX, 0.1, 0);
// scene.add(plane_right);





//-------LASER position wrt slider --------------
let lateralShift;
function laserPointer() {
    // arrow1Radius = 1, arrow2Radius = 1.1, beamCentreRadius = 1, laserPointerRadius = 4;

    //takes the slider value and rotates/repositionsmyRange2 the pointer
    let sliderval = document.getElementById("myRange").value;
    lateralShift = document.getElementById("myRange2").value;

    let x, z, theta, mirrorRadius = 1.5;
    theta = sliderval;
    x = mirrorRadius * Math.cos(theta);
    z = mirrorRadius * Math.sin(theta);

    footballModel.position.set(1.2 + sceneShiftX, 0, -lateralShift);
    // testObject22.position.set(x + sceneShiftX, 0, z);
    plane.rotation.set(0, theta, 0);
    plane_2.rotation.set(0, -theta + Math.PI, 0);

    plane_3.rotation.set(0, theta, 0);
    plane_4.rotation.set(0, -theta + Math.PI, 0);

    plane_left.rotation.set(0, theta, 0);
    plane_right.rotation.set(0, -theta + Math.PI, 0);


    // footballModel.rotation.set(0, -theta, 0);

    console.log("rotated?")

    let xLaserStart = mirrorRadius * Math.cos(theta);
    let zLaserStart = mirrorRadius * Math.sin(theta);

    plane.position.set(xLaserStart + sceneShiftX, 0, -zLaserStart);
    plane_2.position.set(xLaserStart + sceneShiftX, 0, +zLaserStart);

    plane_3.position.set(xLaserStart + sceneShiftX, 0, -zLaserStart);
    plane_4.position.set(xLaserStart + sceneShiftX, 0, +zLaserStart);

    plane_left.position.set(xLaserStart + sceneShiftX - 0.1, -0.05, -zLaserStart - 0.01);
    plane_right.position.set(xLaserStart + sceneShiftX - 0.1, -0.05, +zLaserStart + 0.01);

    // let xArrow = arrow1Radius * Math.cos(theta);
    // let zArrow = arrow1Radius * Math.sin(theta);

    // cylinderIncidentBeam.position.set(xLaserStart + sceneShiftX, 0, zLaserStart);
    // cylinderIncidentBeam.rotation.set(0, -theta, Math.PI / 2);

    // arrowModel.position.set(xArrow + sceneShiftX, 0, zArrow);
    // arrowModel.rotation.set(0, -theta, Math.PI / 2);

    // cylinderRefractedBeam.position.set(xLaserStart + sceneShiftX, 0, -zLaserStart);
    // cylinderRefractedBeam.rotation.set(0, theta, Math.PI / 2);

    // xArrow = arrow2Radius * Math.cos(theta);
    // zArrow = arrow2Radius * Math.sin(theta);

    // arrowModel2.position.set(xArrow + sceneShiftX, 0, -zArrow);
    // arrowModel2.rotation.set(0, theta - Math.PI, Math.PI / 2);
    // let arrow1Radius = 2, arrow2Radius = 2.2, beamCentreRadius = 2, laserPointerRadius = 5.25;

    //positioning the testobject(for positioning the i and r labels)
    // testObject23.position.set(arrow1Radius / 2 * Math.cos(theta / 1.2) + sceneShiftX, -0.4, arrow1Radius / 2 * Math.sin(theta / 1.2));
    // testObject24.position.set(arrow1Radius / 1.5 * Math.cos(theta / 1.2) + sceneShiftX, -0.4, -arrow1Radius / 1.5 * Math.sin(theta / 1.2));


    // if (document.getElementById("normalToggle").checked) {
    //     //Destroy old arcs
    //     destroyArcs();
    //     //create arcs here
    //     createArcs();
    // }
    let angleOfIncidence = 180 - (1 - (theta * 180.0 / Math.PI) / 90) * 180;
    document.getElementById("anglelabelid").innerHTML = "i = " + Math.round(angleOfIncidence).toString() + " &deg;";
}

//---------------Boilerplate code----------------
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 12, 0);
// camera.rotation.set(1, Math.PI, 0.5);

scene.add(camera);
const renderer = new THREE.WebGL1Renderer({
    canvas: canvas,
    antialias: false,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap


// //----------------------css2d---------------------
// camera.layers.enableAll();
// // camera.layers.toggle(1);

// const axesHelper = new THREE.AxesHelper(7);
// axesHelper.layers.enableAll();
// scene.add(axesHelper);

// const mirrorDiv = document.createElement('div');
// mirrorDiv.className = 'label';
// mirrorDiv.textContent = 'Mirror';
// mirrorDiv.style.marginTop = '-1em';
// mirrorDiv.style.backgroundColor = '#aaaaaaaa'; //faint border
// mirrorDiv.style.backdropFilter = "blur(5px)";
// mirrorDiv.style.borderRadius = "0.3em";
// mirrorDiv.style.fontSize = "1.5em";
// mirrorDiv.style.padding = '.3em .5em';
// const mirrorLabel = new CSS2DObject(mirrorDiv);
// // --------------------CONTROL THE LABEL HERE!! -----------------
// mirrorDiv.style.opacity = '0';
// mirrorLabel.position.set(0.25, -0.25, 0);
// plane.add(mirrorLabel);
// mirrorLabel.layers.set(0); //change this to show or hide the labels



// const incidentRayDiv = document.createElement('div');
// incidentRayDiv.className = 'label';
// incidentRayDiv.textContent = 'Incident Ray';
// incidentRayDiv.style.marginTop = '-1em';
// incidentRayDiv.style.backgroundColor = '#aaaaaaaa'; //faint border
// incidentRayDiv.style.backdropFilter = "blur(5px)";
// incidentRayDiv.style.borderRadius = "0.3em";
// incidentRayDiv.style.fontSize = "1.5em";
// incidentRayDiv.style.padding = '.3em .5em';
// const incidentRayLabel = new CSS2DObject(incidentRayDiv);
// // --------------------CONTROL THE LABEL HERE!! -----------------
// //********************************************************************* */
// incidentRayDiv.style.opacity = '0';
// //*******************  //change this to show or hide the labels!!!!!!!!!!!!
// incidentRayLabel.position.set(0, 0, 0);
// cylinderIncidentBeam.add(incidentRayLabel);
// incidentRayLabel.layers.set(0); //change this to show or hide the labels





// const reflectedRayDiv = document.createElement('div');
// reflectedRayDiv.className = 'label';
// reflectedRayDiv.textContent = 'Reflected Ray';
// reflectedRayDiv.style.marginTop = '-1em';
// reflectedRayDiv.style.backgroundColor = '#aaaaaaaa'; //faint border
// reflectedRayDiv.style.backdropFilter = "blur(5px)";
// reflectedRayDiv.style.borderRadius = "0.3em";
// reflectedRayDiv.style.padding = '.3em .5em';
// reflectedRayDiv.style.fontSize = "1.5em";
// const reflectedRayLabel = new CSS2DObject(reflectedRayDiv);
// // --------------------CONTROL THE LABEL HERE!! -----------------
// //********************************************************************* */
// reflectedRayDiv.style.opacity = '0';
// //*******************  //change this to show or hide the labels!!!!!!!!!!!!
// reflectedRayLabel.position.set(0, 0, 0);
// cylinderRefractedBeam.add(reflectedRayLabel);
// reflectedRayLabel.layers.set(0); //change this to show or hide the labels





// const normalDiv = document.createElement('div');
// normalDiv.className = 'label';
// normalDiv.textContent = 'normal';
// normalDiv.style.marginTop = '-1em';
// normalDiv.style.backgroundColor = '#aaaaaaaa'; //faint border
// normalDiv.style.backdropFilter = "blur(5px)";
// normalDiv.style.borderRadius = "0.3em";
// normalDiv.style.padding = '.3em .5em';
// normalDiv.style.fontSize = "1.5em";
// const normalLabel = new CSS2DObject(normalDiv);
// // --------------------CONTROL THE LABEL HERE!! -----------------
// //********************************************************************* */
// normalDiv.style.opacity = '0';
// //*******************  //change this to show or hide the labels!!!!!!!!!!!!
// normalLabel.position.set(-0.1, 0, 3);
// plane.add(normalLabel);
// normalLabel.layers.set(0); //change this to show or hide the labels






// const laserPointerDiv = document.createElement('div');
// laserPointerDiv.className = 'label';
// laserPointerDiv.textContent = 'Laser Pointer';
// laserPointerDiv.style.marginTop = '-1em';
// laserPointerDiv.style.backgroundColor = '#aaaaaaaa'; //faint border
// laserPointerDiv.style.backdropFilter = "blur(5px)";
// laserPointerDiv.style.borderRadius = "0.3em";
// laserPointerDiv.style.padding = '.3em .5em';
// laserPointerDiv.style.fontSize = "1.5em";
// const laserPointerLabel = new CSS2DObject(laserPointerDiv);
// // --------------------CONTROL THE LABEL HERE!! -----------------
// //********************************************************************* */
// laserPointerDiv.style.opacity = '0';
// //*******************  //change this to show or hide the labels!!!!!!!!!!!!
// laserPointerLabel.position.set(0, 0, 0);

// testObject22.add(laserPointerLabel);
// laserPointerLabel.layers.set(0); //change this to show or hide the labels






// const angleiDiv = document.createElement('div');
// angleiDiv.className = 'label';
// angleiDiv.textContent = 'i ';
// angleiDiv.style.marginTop = '-1em';
// angleiDiv.style.backgroundColor = '#aaaaaa00'; //faint border
// // angleiDiv.style.backdropFilter = "blur(1px)";
// angleiDiv.style.borderRadius = "0.3em";
// angleiDiv.style.padding = '.3em .5em';
// angleiDiv.style.fontSize = "2em";
// angleiDiv.style.color = "white";
// const angleiLabel = new CSS2DObject(angleiDiv);
// // --------------------CONTROL THE LABEL HERE!! -----------------
// //********************************************************************* */
// angleiDiv.style.opacity = '0';
// //*******************  //change this to show or hide the labels!!!!!!!!!!!!
// angleiLabel.position.set(0, 0, 0);

// testObject23.add(angleiLabel);
// angleiLabel.layers.set(0); //change this to show or hide the labels




// const anglerDiv = document.createElement('div');
// anglerDiv.className = 'label';
// anglerDiv.textContent = 'r';
// anglerDiv.style.marginTop = '-1em';
// anglerDiv.style.backgroundColor = '#aaaaaa00'; //faint border
// // anglerDiv.style.backdropFilter = "blur(1px)";
// anglerDiv.style.borderRadius = "0.3em";
// anglerDiv.style.padding = '.3em .5em';
// anglerDiv.style.fontSize = "2em";
// anglerDiv.style.color = "white";
// const anglerLabel = new CSS2DObject(anglerDiv);
// // --------------------CONTROL THE LABEL HERE!! -----------------
// //********************************************************************* */
// anglerDiv.style.opacity = '0';
// //*******************  //change this to show or hide the labels!!!!!!!!!!!!
// anglerLabel.position.set(0, 0, 0);

// testObject24.add(anglerLabel);
// anglerLabel.layers.set(0); //change this to show or hide the labels







// let labelRenderer = new CSS2DRenderer();
// labelRenderer.setSize(window.innerWidth, window.innerHeight);
// labelRenderer.domElement.style.position = 'absolute';
// labelRenderer.domElement.style.top = '0px';
// document.body.appendChild(labelRenderer.domElement);
//-------------------css2d ends-----------------------


//LIGHTING
//DIR LIGHTING
let dirLight1 = new THREE.DirectionalLight(0xffffff, 1);
dirLight1.position.set(sceneShiftX + 1, 10, 0);
dirLight1.castShadow = true;
dirLight1.layers.enableAll(); //so t
scene.add(dirLight1);

//Ambient LIGHTING
let ambient1 = new THREE.AmbientLight(0xffffffff, 1.2); // soft white light
ambient1.layers.enableAll();
scene.add(ambient1);


renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
// renderer.gammaOutput = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.4;
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(canvas);
renderer.setClearColor("#ffffff"); // whi/te background - replace ffffff with any hex color

// const helper = new THREE.CameraHelper(dirLight1.shadow.camera);
// scene.add(helper);

//Orbit controlls
const controls = new OrbitControls(camera, renderer.domElement);
// const controls = new OrbitControls(camera, labelRenderer.domElement);   //for labels
// controls.minAzimuthAngle = -2;
// controls.maxAzimuthAngle = 2;
controls.maxPolarAngle = 1.6;
controls.maxDistance = 8;
controls.minDistance = 6;
// const cameraControls = new CameraControls(camera, renderer.domElement);
// CameraControls.rotateTo(0, 0, enableTransition);
renderer.render(scene, camera);



let timeVar = 1;
function animate() {
    /*****WARNING********/
    //This animate function starts before the models are even loaded and casuses errors
    requestAnimationFrame(animate);
    // root1.rotation.x += 0.01;
    // root1.rotation.y += 0.01;
    // footballModel.rotation.x += 0.01;
    // console.log(footballModel.rotation.x);
    renderer.render(scene, camera);
    // labelRenderer.render(scene, camera);
    timeVar++;
    if (timeVar == 30) { //ERROR MAY OCCUR HERE TOO
        laserPointer();
    }

    // console.log(camera.position);
    // console.log(camera.getWorldPosition());
    // cube.rotation.x = documentgetElementByI("myRange").value;
    // line.rotation.x = documentgetElementByI("myRange").value;
    // cube.positio n.x = documentgetElementByI("myRange2").value;
    // line.position.x = documentgetElementByI("myRange2").value;
    // cube.position.y = documentgetElementByI("myRangey").value;
    // cube.position.z = documentgetElementByI("myRangez").value;
    // line.position.z = documentgetElementByI("myRangez").value;
};
animate(); // this gets called before the model gets loaded.

document.getElementById("myRange").oninput = function () {
    laserPointer();
}

document.getElementById("myRange2").oninput = function () {
    laserPointer();
}

document.getElementById("btnid1").onclick = function () {
    document.getElementById("myRange").value = 1.570796327;
    laserPointer();
}
document.getElementById("btnid2").onclick = function () {
    document.getElementById("myRange").value = 1.047197551;
    laserPointer();
}
document.getElementById("btnid3").onclick = function () {
    document.getElementById("myRange").value = 0.7853981634;
    laserPointer();
}
document.getElementById("btnid4").onclick = function () {
    document.getElementById("myRange").value = 0.6283185307;
    laserPointer();
}
document.getElementById("btnid5").onclick = function () {
    document.getElementById("myRange").value = 0.5235987756;
    laserPointer();
}
document.getElementById("btnid6").onclick = function () {
    document.getElementById("myRange").value = 0.3926990817;
    laserPointer();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}










//async funtion to fade in and fade away the

// See what happens to the reflected ray when we move the angle of the pointer.
// Here the angle of the incidence, i, is equal to the angle of relection, r.

//change the camera view to show that the normal, incident ray and the relfected rays all lie on the same plane




//1. make markers for
/**
 * 1. laser pointer
 * 2. Mirror
 * 3. normal
 * 4. incident ray (if angle greater than certain angle show it, else hide)
 * 5. reflected ray
 * 6. 
 */