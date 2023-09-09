import { Scene as ThreeScene, AxesHelper, BoxGeometry, MeshBasicMaterial, Mesh, PlaneGeometry} from 'three'
import type { Camera } from './Camera';
import type { Renderer } from './Renderer';

export class Scene extends ThreeScene {
    private _renderer: Renderer;
    private _camera: Camera;

    public start: () => void;

    constructor(renderer: Renderer, camera: Camera) {
        super();
        this._renderer = renderer;
        this._camera = camera;

        let animate = () => {
            requestAnimationFrame( animate );
            renderer.render(this, camera);
        }
        this.start = animate;
    }

    buildEnvironment() {

        const axesHelper = new AxesHelper( 2);
        this.add( axesHelper );

        // Create plane
        let plane = new Mesh(
            new PlaneGeometry(10, 10),
            new MeshBasicMaterial( { color: 0xaaaaaa } )
        );
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -0.5;
        plane.name = 'plane';
        this.add(plane);

        // Test items
        let cube = new Mesh(
            new BoxGeometry( 1, 1, 1 ),
            new MeshBasicMaterial( { color: 0x00ff00 } )
        );
        cube.name = 'cube';
        this.add( cube );
    }
}