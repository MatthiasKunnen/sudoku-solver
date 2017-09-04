import { Cell } from './cell.model';

export class Sudoku {
    public grid?: Array<Array<Cell>> = Array(Array());

    public constructor(init?: Partial<Sudoku>) {
        Object.assign(this, init);
    }
}
