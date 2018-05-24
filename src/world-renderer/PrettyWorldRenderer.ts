import { World } from '../simulation/World';

export class PrettyWorldRenderer {

    private world: World;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private cellSpacing: number = 5;
    private worldBorder: number = 10;
    private cellRadius: number = 5;
    private cellSize: number = 20;

    constructor(world: World) {
        this.world = world;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.world.getWidth() * (this.cellSize + this.cellSpacing)
            - this.cellSpacing + 2 * (this.worldBorder);
        this.canvas.height = this.world.getHeight() * (this.cellSize + this.cellSpacing)
            - this.cellSpacing + 2 * (this.worldBorder);
        this.context = this.canvas.getContext('2d');
    }

    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    public draw(): void {
        this.context.fillStyle = 'white';
        this.context.fillRect(
            0,
            0,
            this.world.getWidth() * (this.cellSize + this.cellSpacing) - this.cellSpacing + 2 * (this.worldBorder),
            this.world.getHeight() * (this.cellSize + this.cellSpacing) - this.cellSpacing + 2 * (this.worldBorder)
        );

        this.context.fillStyle = 'black';
        this.roundRect(
            0,
            0,
            this.world.getWidth() * (this.cellSize + this.cellSpacing) - this.cellSpacing + 2 * (this.worldBorder),
            this.world.getHeight() * (this.cellSize + this.cellSpacing) - this.cellSpacing + 2 * (this.worldBorder),
            14
        );

        this.context.fillStyle = '#ff8c00';
        this.context.strokeStyle = '#444444';
        this.context.lineWidth = 1;

        for (let i: number = 0; i < this.world.getHeight(); i++) {
            for (let j: number = 0; j < this.world.getWidth(); j++) {
                if (this.world.getCellAt(j, i).populated) {
                    this.context.fillStyle = '#ff8c00';
                    this.roundRect(j * (this.cellSize + this.cellSpacing) + this.worldBorder,
                        i * (this.cellSize + this.cellSpacing) + this.worldBorder,
                        this.cellSize, this.cellSize, this.cellRadius);
                } else {
                    this.context.fillStyle = '#444444';
                    this.roundRect(j * (this.cellSize + this.cellSpacing) + this.worldBorder,
                        i * (this.cellSize + this.cellSpacing) + this.worldBorder,
                        this.cellSize, this.cellSize, this.cellRadius);
                }
            }
        }
    }

    private roundRect(x: number, y: number, w: number, h: number, r: number): void {
        if (w < 2 * r) {
            r = w / 2;
        }
        if (h < 2 * r) {
            r = h / 2;
        }
        this.context.beginPath();
        this.context.moveTo(x + r, y);
        this.context.arcTo(x + w, y, x + w, y + h, r);
        this.context.arcTo(x + w, y + h, x, y + h, r);
        this.context.arcTo(x, y + h, x, y, r);
        this.context.arcTo(x, y, x + w, y, r);
        this.context.closePath();
        this.context.fill();
    }

}
