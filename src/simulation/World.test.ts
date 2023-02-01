import { World } from "./World";

describe("A World", () => {

    test("that the world has correct size", () => {
        const world: World = new World(10, 20);

        expect(world.getWidth()).toBe(10);
        expect(world.getHeight()).toBe(20);
    });

    test("that cells are initially not populated", () => {
        const world: World = new World(10, 10);

        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                expect(world.getCellAt(x, y).populated).toBe(false);
            }
        }
    });

    test("that the world is randomly populated", () => {
        const world: World = new World(10, 20);
        world.randomize();

        let populated = 0;

        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                populated += world.getCellAt(x, y).populated ? 1 : 0;
            }
        }

        expect(populated).toBeGreaterThan(0);
    });

});
