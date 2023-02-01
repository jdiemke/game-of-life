import { Cell } from "./Cell";

export class World {

    private width: number;
    private height: number;
    private cells: Array<Cell>;

    public constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.initializeCells();
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public randomize(): void {
        for (let i: number = 0; i < this.height; i++) {
            for (let j: number = 0; j < this.width; j++) {
                const alife: boolean = Math.random() >= 0.5;
                const cell: Cell = this.getCellAt(j, i);
                cell.populated = alife;
            }
        }
    }

    private initializeCells(populated: boolean = false): void {
        this.cells = new Array(this.width * this.height).fill(undefined).map(
            () => new Cell(populated)
        );
    }

    public getCellAt(x: number, y: number): Cell {
        return this.cells[this.mod(y, this.height) * this.width + this.mod(x, this.width)];
    }

    private mod(num, mo): number {
        return (num + mo) % mo;
    }

}
