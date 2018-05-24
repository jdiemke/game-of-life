import { World } from '../simulation/World';

export class WorldRenderer {

    private world: World;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(world: World) {
        this.world = world;
        this.canvas = document.createElement('canvas');
        this.canvas.width = 12 * world.getWidth() + 2;
        this.canvas.height = 12 * world.getHeight() + 2;
        this.context = this.canvas.getContext('2d');
    }

    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    public draw(): void {
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.world.getWidth() * 12 + 2, this.world.getHeight() * 12 + 2);

        this.context.fillStyle = '#aaffaa';
        this.context.strokeStyle = '#444444';
        this.context.lineWidth = 1;

        for (let i: number = 0; i < this.world.getHeight(); i++) {
            for (let j: number = 0; j < this.world.getWidth(); j++) {
                if (this.world.getCellAt(j, i).populated) {
                    this.context.fillRect(j * 12 + 2, i * 12 + 2, 10, 10);
                } else {
                    this.context.strokeRect(j * 12 + 2 + 0.5, i * 12 + 2 + 0.5, 9, 9);
                }
            }
        }
    }

}
