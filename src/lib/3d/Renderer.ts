import { get } from 'svelte/store';
import { WebGLRenderer as ThreeRenderer } from 'three' 
import { viewport } from './Three';

export class Renderer extends ThreeRenderer {
    constructor(container: HTMLDivElement) {
        super();

        // Set the size from stored viewport
        this.setSize( get(viewport).width, get(viewport).height );

        // Add the canvas to the DOM
        container.appendChild(this.domElement);
    }
}