import { GameOfLife } from './index';

describe('GameOfLife', () => {

    it('should return correct name', () => {
        expect(new GameOfLife().getName()).toBe('game of life');
    });

});
