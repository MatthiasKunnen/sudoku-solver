import { remove } from 'lodash';

export class Cell {
    public block?: Array<Cell> = [];

    public column?: Array<Cell> = [];
    public columnIndex: number;

    public possibilities?: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    public value?: number;

    public row?: Array<Cell> = [];
    public rowIndex: number;

    public constructor(init?: Partial<Cell>) {
        Object.assign(this, init);
    }

    /**
     * Returns an array containing all the related groups of the cell.
     * @return {Array<Array<Cell>>}
     */
    public getGroups(): Array<Array<Cell>> {
        return [this.block, this.column, this.row];
    }

    /**
     * Calculates the possibilities based on the cell's groups.
     * @return {boolean} true if a possibility changed.
     */
    public computePossibilities(): boolean {
        throw Error('Not implemented');
    }

    /**
     * Removes a possibility.
     * @return {boolean} true is a possibility was removed, false otherwise.
     */
    public eliminatePossibility(possibility: number): boolean {
        return remove(this.possibilities, (p) => p === possibility).length > 0;
    }

    /**
     * Propagates the changed value through the groups.
     */
    public propagateValueChange(): void {
        throw Error('Not implemented');
    }
}
