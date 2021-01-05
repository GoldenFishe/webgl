import {PCFSoftShadowMap, sRGBEncoding, WebGLRenderer} from "three";

export default class Renderer extends WebGLRenderer {
    constructor() {
        super({antialias: true});
        this.setSize(window.innerWidth, window.innerHeight);
        this.setPixelRatio(window.devicePixelRatio);
        this.outputEncoding = sRGBEncoding;
        this.shadowMap.enabled = true;
        this.shadowMap.type = PCFSoftShadowMap;
        document.body.appendChild(this.domElement);
    }
}