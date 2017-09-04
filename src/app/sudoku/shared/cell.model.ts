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
}
