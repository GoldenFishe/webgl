import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {AnimationMixer} from "three";
// @ts-ignore
import model from "./assets/models/scene.gltf";

export default class Character {
    public scene;
    public mixer;
    public walkAction;

    constructor() {
        this.scene = null;
        this.mixer = null;
        this.walkAction = null;
    }

    public loadModel(scene) {
        new GLTFLoader().load(model,
            gltf => {
                this.scene = gltf.scene;
                const [animation] = gltf.animations;
                this.scene.traverse(object => {
                    object.receiveShadow = true;
                    object.castShadow = true;
                })
                this.mixer = new AnimationMixer(gltf.scene);
                this.walkAction = this.mixer.clipAction(animation);
                scene.add(this.scene);
            });
    }
}