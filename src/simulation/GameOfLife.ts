import { BehaviorSubject, Observable, Subject, Subscription, timer } from 'rxjs';
import { World } from './World';

export class GameOfLife {

    private generation: World;
    private subject: Subject<World>;
    private subscription: Subscription;

    constructor(private width: number, private height: number) {
        this.generation = new World(width, height);
        this.subject = new BehaviorSubject(this.generation);
    }

    public randomize(): void {
        this.generation.randomize();
        this.updateGeneration(this.generation);
    }

    public generationChanged(): Observable<World> {
        return this.subject.asObservable();
    }

    public start(): void {
        this.subscription = timer(0, 500).subscribe(() => {
            this.updateGeneration(this.computeNextGeneration());
        });
    }

    public stop(): void {
        this.subscription.unsubscribe();
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    private updateGeneration(generation: World): void {
        this.generation = generation;
        this.subject.next(this.generation);
    }

    private computeNextGeneration(): World {
        const nextGeneration: World = new World(this.width, this.height);

        for (let y: number = 0; y < nextGeneration.getHeight(); y++) {
            for (let x: number = 0; x < nextGeneration.getWidth(); x++) {
                this.computeCell(x, y, nextGeneration, this.generation);
            }
        }

        return nextGeneration;
    }

    private computeCell(x: number, y: number, next: World, current: World): void {
        const count: number = this.getPopulatedNeighbourCounr(x, y, current);
        next.getCellAt(x, y).populated = this.computeNewCellValueByCount(x, y, current, count);
    }

    private computeNewCellValueByCount(x: number, y: number, current: World, count): boolean {
        if (!current.getCellAt(x, y).populated && count === 3) {
            return true;
        }

        if (current.getCellAt(x, y).populated && (count < 2 || count > 3)) {
            return false;
        }

        if (current.getCellAt(x, y).populated && (count === 2 || count === 3)) {
            return true;
        }

        return false;
    }

    private getPopulatedNeighbourCounr(x: number, y: number, current: World): number {
        let count: number = 0;

        for (let i: number = -1; i <= 1; i++) {
            for (let j: number = -1; j <= 1; j++) {
                count += current.getCellAt(x + j, y + i).populated ? 1 : 0;
            }
        }

        return count - (current.getCellAt(x, y).populated ? 1 : 0);
    }

}
