import { World } from './simulation/World';
import { PrettyWorldRenderer } from './world-renderer/PrettyWorldRenderer';

const world: World = new World(30, 15);
const prettyWorldRenderer: PrettyWorldRenderer = new PrettyWorldRenderer(world);

document.body.appendChild(prettyWorldRenderer.getCanvas());

prettyWorldRenderer.draw();

setInterval(() => {
    world.randomize();
    prettyWorldRenderer.draw();
}, 1000);
