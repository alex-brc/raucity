import { writable } from "svelte/store";
import { Camera } from "./Camera";
import { Renderer } from "./Renderer";
import { Scene } from "./Scene";

export const viewport = writable<DOMRect>();

export function init(container: HTMLDivElement) {
        viewport.set(container.getBoundingClientRect());

        const camera = new Camera();
        const renderer = new Renderer(container);

        const scene = new Scene(renderer, camera);

        scene.buildEnvironment();
        scene.start();
    }