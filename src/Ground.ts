import {Mesh, MeshStandardMaterial, PlaneGeometry, RepeatWrapping, TextureLoader} from "three";

export default class Ground {
    private readonly geometry;
    private readonly material;
    readonly mesh;

    constructor() {
        this.geometry = new PlaneGeometry(100, 100);
        this.material = new MeshStandardMaterial({color: 0xfffff});
        this.mesh = new Mesh(this.geometry, this.material);

        this.mesh.rotateX(-Math.PI / 2);
        this.mesh.receiveShadow = true;

        this.setTexture();
    }

    private setTexture() {
        const texture = new TextureLoader().load('src/assets/textures/grass.jpg');
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.repeat.set(10, 10);
        this.material.map = texture;
    }
}