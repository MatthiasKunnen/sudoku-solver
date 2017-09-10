import { Cell } from './cell.model';

export class Sudoku {
    public grid?: Array<Array<Cell>> = Array();

    public columns: Array<Array<Cell>> = Array();

    public blocks: Array<Array<Cell>> = Array();

    public constructor(init?: Partial<Sudoku>) {
        Object.assign(this, init);
    }
}
