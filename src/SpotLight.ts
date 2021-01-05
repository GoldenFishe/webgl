import {SpotLight} from 'three';

export default class Light extends SpotLight {
    constructor() {
        super(0xffffff, 0.5);
        this.position.set(10, 10, 10);
        this.castShadow = true;
    }
}