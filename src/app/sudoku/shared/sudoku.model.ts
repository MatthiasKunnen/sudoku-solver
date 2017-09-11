import { Cell } from './cell.model';

export class Sudoku {
    public grid?: Array<Array<Cell>> = Array();

    public columns: Array<Array<Cell>> = Array();

    public blocks: Array<Array<Cell>> = Array();

    public constructor(init?: Partial<Sudoku>) {
        Object.assign(this, init);
    }

    public areValuesValid(): boolean {
        throw Error('Not implemented');
    }

    /**
     * Searches groups for cells which only have one possibility.
     * Found cells get their value set.
     * @return {number} The amount of cells found
     */
    public runSinglePossibility(): number {
        throw Error('Not implemented');
    }

    /**
     * Searches groups for cells that allow only a certain number.
     * Found cells get their value set.
     * @return {number} The amount of cells found.
     */
    public runUniquePossibility(): number {
        throw Error('Not implemented');
    }

    /**
     * Runs linear possibility elimination.
     * @return {number} The amount of possibilities that were eliminated.
     */
    public runLPE(): number {
        throw new Error('applyLPE is not implemented.');
    }
}
