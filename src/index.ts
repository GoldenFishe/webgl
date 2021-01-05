import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {
    AmbientLight,
    AnimationMixer,
    AxesHelper,
    Clock,
    DoubleSide,
    Mesh,
    MeshStandardMaterial,
    PCFSoftShadowMap,
    PerspectiveCamera,
    PlaneGeometry,
    Raycaster,
    RepeatWrapping,
    Scene,
    SpotLight,
    sRGBEncoding,
    TextureLoader,
    Vector2,
    Vector3,
    WebGLRenderer
} from 'three';
import Camera from './Camera';
import Renderer from "./Renderer";
import Ground from "./Ground";
import Light from "./SpotLight";
import Character from "./Character";
//
// let character;
// let mixer;
// let walkAction;
// let targetPoint;
// let isWalking = false;
// let passedWalkingAnimationTime = 0;
// let walkingAnimationDuration = 5;
// const clock = new Clock();
// const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
//
// const scene = new Scene();
//
// scene.add(new AxesHelper())
//
// const renderer = new WebGLRenderer({antialias: true});
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.outputEncoding = sRGBEncoding;
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = PCFSoftShadowMap;
// renderer.outputEncoding = sRGBEncoding;
// renderer.setAnimationLoop(animation);
//
// const ground = createGround();
// ground.rotateX(Math.PI / 2);
// ground.receiveShadow = true;
// scene.add(ground);
//
// createCharacter();
//
// const ambient = new AmbientLight(0xffffff, 0.1);
// scene.add(ambient);
//
//
// const spotLight = new SpotLight(0xffffff, 0.5);
// spotLight.position.set(10, 10, 10);
// spotLight.castShadow = true;
// scene.add(spotLight);
//
// const controls = new OrbitControls(camera, renderer.domElement);
// document.body.appendChild(renderer.domElement);
//
// const raycaster = new Raycaster();
//
// window.addEventListener('click', onClick, false);
//
// let characterPosition = null;
//
// function animation(time) {
//     controls.update();
//     const delta = clock.getDelta();
//
//     if (isWalking) {
//         passedWalkingAnimationTime += delta;
//         const k = Math.min(passedWalkingAnimationTime / walkingAnimationDuration, 1);
//         const v = new Vector3().lerpVectors(characterPosition, targetPoint, k);
//         character.position.copy(v);
//         mixer.update(delta);
//         character.lookAt(targetPoint);
//         if (passedWalkingAnimationTime >= walkingAnimationDuration) {
//             isWalking = false;
//             passedWalkingAnimationTime = 0;
//             characterPosition = null;
//             walkAction.stop();
//         }
//     }
//     renderer.render(scene, camera);
// }
//
// function createGround() {
//     const texture = new TextureLoader().load('src/assets/textures/grass.jpg');
//     texture.wrapS = RepeatWrapping;
//     texture.wrapT = RepeatWrapping;
//     texture.repeat.set(10, 10);
//     const groundPlaneGeometry = new PlaneGeometry(100, 100);
//     const groundPlaneMaterial = new MeshStandardMaterial({
//         side: DoubleSide,
//         color: 0xffffff,
//         metalness: 0,
//         roughness: 0,
//         map: texture
//     });
//     return new Mesh(groundPlaneGeometry, groundPlaneMaterial);
// }
//
// function createCharacter() {
//     new GLTFLoader().load('src/assets/models/scene.gltf',
//         loader => {
//             character = loader.scene;
//             const [animation] = loader.animations;
//             character.traverse(s => {
//                 s.receiveShadow = true;
//                 s.castShadow = true;
//             })
//             camera.position.set(character.position.x, character.position.y + 10, character.position.z - 10);
//             camera.lookAt(character.position)
//             mixer = new AnimationMixer(loader.scene);
//             walkAction = mixer.clipAction(animation);
//             scene.add(character);
//         });
// }
//
// function onClick(event) {
//     const mouse = new Vector2();
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//     raycaster.setFromCamera(mouse, camera);
//     const [intersect] = raycaster.intersectObject(ground);
//     targetPoint = intersect.point;
//     characterPosition = character.position.clone();
//     isWalking = true;
//     passedWalkingAnimationTime = 0;
//     walkAction.play();
// }

class Application {
    private readonly scene;
    private readonly camera;
    private readonly clock;
    private readonly renderer;
    private readonly ambientLight;
    private readonly spotLight;
    private readonly controls;
    private readonly raycaster;
    private readonly ground;
    private readonly character;

    constructor() {
        this.scene = new Scene();
        this.camera = new Camera();
        this.clock = new Clock();
        this.renderer = new Renderer();
        this.ambientLight = new AmbientLight(0xffffff, 0.1);
        this.spotLight = new Light();
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.raycaster = new Raycaster();
        this.ground = new Ground();
        this.character = new Character();

        this.renderer.setAnimationLoop(this.animation.bind(this));
        this.addObjectsToScene();
    }

    private animation(time) {
        this.renderer.render(this.scene, this.camera);
    }

    private addObjectsToScene() {
        this.scene.add(this.ground.mesh);
        this.scene.add(this.ambientLight);
        this.scene.add(this.spotLight);
        this.scene.add(new AxesHelper());
        this.character.loadModel(this.scene);
    }
}

new Application();
