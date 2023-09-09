import { threeConfig } from '$lib/config';
import { get } from 'svelte/store';
import { PerspectiveCamera } from 'three'
import { viewport } from './Three';

export class Camera extends PerspectiveCamera {

    constructor() {
        super(
            threeConfig.camera.fov, 
            get(viewport).width / get(viewport).height, 
            threeConfig.camera.near, 
            threeConfig.camera.far
        );

        this.position.y = 2;
        this.position.z = 5;
    }
}