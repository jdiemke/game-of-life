import { Observable, Subject, Subscription, timer } from 'rxjs';
import { World } from './World';

export class GameOfLife {

    private generation: World;
    private subject: Subject<World>;
    private subscription: Subscription;

    constructor(private width: number, private height: number) {
        this.generation = new World(width, height);
        this.generation.initializeCells();
        this.subject = new Subject();
    }

    public generationChanged(): Observable<World> {
        return this.subject.asObservable();
    }

    public start(): void {
        this.subscription = timer(1000, 1000).subscribe(() => {
            this.computeNextGeneration();
            this.subject.next(this.generation);
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

    private computeNextGeneration(): void {
        const nextGeneration: World = new World(this.width, this.height);
        nextGeneration.randomize();
        this.generation = nextGeneration;
    }

}
