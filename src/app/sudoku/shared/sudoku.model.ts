import { asSequence } from 'sequency';
import { Cell } from './cell.model';

export class Sudoku {
    public grid?: Array<Array<Cell>> = Array();

    public columns: Array<Array<Cell>> = Array();

    public blocks: Array<Array<Cell>> = Array();

    public cells: Array<Cell> = Array();

    public constructor(init?: Partial<Sudoku>) {
        Object.assign(this, init);
    }

    /**
     * Returns true when the list contains duplicates.
     * @param {Array<Cell>} list
     * @returns {boolean}
     */
    private static hasDuplicateCells(list: Array<Cell>): boolean {
        const values = list
            .filter(cell => cell.hasValue())
            .map(cell => cell.value);

        return Sudoku.hasDuplicates(values);
    }

    /**
     * Test if an array contains duplicate items.
     * @param {Array<T>} list
     * @returns {boolean}
     */
    private static hasDuplicates<T>(list: Array<T>): boolean {
        return (new Set<T>(list)).size !== list.length;
    }

    /**
     * Checks if values are valid.
     * @returns {boolean} true if the values are valid, false otherwise.
     */
    public areValuesValid(): boolean {
        for (const group of this.getGroups()) {
            for (const list of group) {
                if (Sudoku.hasDuplicateCells(list)) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Sets the possibilities on all cells.
     * @returns {boolean} true if any possibilities were changed, false otherwise.
     */
    public runCompletePossibilityCheck(): boolean {
        let changed = false;
        for (const cell of this.cells) {
            if (cell.computePossibilities()) {
                changed = true;
            }
        }

        return changed;
    }

    /**
     * Get the rows, columns and blocks of the sudoku.
     * @returns {Array<Array<Array<Cell>>>}
     */
    public getGroups(): Array<Array<Array<Cell>>> {
        return [this.grid, this.columns, this.blocks];
    }

    /**
     * Checks if the sudoku is complete. Doesn't check valid state.
     * @returns {boolean} true if the sudoku is complete, false otherwise.
     */
    public isSolved(): boolean {
        return asSequence(this.cells).all(c => c.hasValue());
    }

    /**
     * Searches groups for cells which only have one possibility.
     * Found cells get their value set.
     * @return {number} The amount of cells found
     */
    public runSinglePossibility(): number {
        let counter = 0;

        for (const group of this.getGroups()) {
            for (const list of group) {
                for (const cell of list.filter(c => !c.hasValue())) {
                    if (cell.possibilities.length === 1) {
                        cell.value = cell.possibilities[0];
                        cell.propagateValueChange();
                        counter++;
                    }
                }
            }
        }

        return counter;
    }

    /**
     * Searches groups for cells that allow a certain number only in one cell.
     * Found cells get their value set.
     * @return {number} The amount of cells found.
     */
    public runUniquePossibility(): number {
        let counter = 0;

        for (const group of this.getGroups()) {
            for (const list of group) {
                const possibilities: { [key: number]: Array<Cell> } = {};

                for (let i = 1; i <= 9; i++) {
                    possibilities[i] = [];
                }

                for (const cell of list.filter(c => !c.hasValue())) {
                    for (const possibility of cell.possibilities) {
                        possibilities[possibility].push(cell);
                    }
                }

                for (const number of Object.keys(possibilities)) {
                    const value = possibilities[number];
                    if (value.length === 1) {
                        const c = value[0];
                        c.value = Number(number);
                        c.propagateValueChange();
                        counter++;
                    }
                }
            }
        }

        return counter;
    }

    /**
     * Runs linear possibility elimination.
     * @return {number} The amount of possibilities that were eliminated.
     */
    public runLPE(): number {
        throw new Error('applyLPE is not implemented.');
    }
}
