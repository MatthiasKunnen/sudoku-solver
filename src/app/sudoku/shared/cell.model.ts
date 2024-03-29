import { remove } from 'lodash';
import { asSequence } from 'sequency';

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
        if (this.possibilities.length === 0 || this.hasValue()) {
            return false; // No need to calculate
        }

        let changed;

        for (const group of this.getGroups()) {
            for (const v of asSequence(group)
                .filter(c => c.hasValue())
                .map(c => c.value)
                .toList()) {
                if (this.eliminatePossibility(v)) {
                    if (this.possibilities.length === 0) {
                        return true; // Stop eliminating
                    }
                    changed = true;
                }
            }
        }

        return changed;
    }

    /**
     * Removes a possibility.
     * @return {boolean} true is a possibility was removed, false otherwise.
     */
    public eliminatePossibility(possibility: number): boolean {
        return this.hasValue()
            ? false
            : remove(this.possibilities, (p) => p === possibility).length > 0;
    }

    /**
     * Checks if the cell has a value.
     * @returns {boolean}
     */
    public hasValue(): boolean {
        return typeof this.value === 'number';
    }

    /**
     * Propagates the changed value through the groups.
     */
    public propagateValueChange(): void {
        for (const group of this.getGroups()) {
            for (const cell of group) {
                if (!cell.hasValue()) {
                    cell.eliminatePossibility(this.value);
                }
            }
        }
    }
}
