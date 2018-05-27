import { GameOfLife } from './simulation/GameOfLife';
import { PrettyWorldRenderer } from './world-renderer';

const gameOfLife: GameOfLife = new GameOfLife(15, 15);
const worldRenderer: PrettyWorldRenderer = new PrettyWorldRenderer(gameOfLife);

document.body.appendChild(worldRenderer.getCanvas());

gameOfLife.start();
