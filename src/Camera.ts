import {PerspectiveCamera} from "three";

export default class Camera extends PerspectiveCamera {
    constructor() {
        super(70, window.innerWidth / window.innerHeight, 0.01, 100);
        this.position.set(10, 10, 10);
    }
}