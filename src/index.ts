import { GameOfLife } from './simulation/GameOfLife';
import { PrettyWorldRenderer } from './world-renderer';

const gameOfLife: GameOfLife = new GameOfLife(30, 20);
const worldRenderer: PrettyWorldRenderer = new PrettyWorldRenderer(gameOfLife);

document.body.appendChild(worldRenderer.getCanvas());

const button = document.createElement('button');
button.textContent = 'Start';
document.body.appendChild(button);
let toggle: boolean = false;
button.onclick = () => {

    if (toggle) {
        button.textContent = 'Start';
        gameOfLife.stop();
    } else {
        gameOfLife.start();
        button.textContent = 'Stop';
    }
    toggle = !toggle;
};

const buttonRand = document.createElement('button');
buttonRand.textContent = 'Randomize';
document.body.appendChild(buttonRand);
buttonRand.onclick = () => {
    gameOfLife.randomize();
};
