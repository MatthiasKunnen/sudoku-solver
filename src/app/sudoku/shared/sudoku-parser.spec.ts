import { assert } from 'chai';

import { Cell } from './cell.model';
import { Sudoku } from './sudoku.model';
import { SudokuService } from './sudoku.service';

interface RawSudoku {
    input: string;
    array: Array<Array<number>>;
    sudoku?: Sudoku;
}

interface SolvableRawSudoku {
    complete: RawSudoku;
    start: RawSudoku;
}

const sudoku1: SolvableRawSudoku = {
    complete: {
        input: `
            4,3,5,2,6,9,7,8,1
            6,8,2,5,7,1,4,9,3
            1,9,7,8,3,4,5,6,2
            8,2,6,1,9,5,3,4,7
            3,7,4,6,8,2,9,1,5
            9,5,1,7,4,3,6,2,8
            5,1,9,3,2,6,8,7,4
            2,4,8,9,5,7,1,3,6
            7,6,3,4,1,8,2,5,9`,
        array: [
            [4, 3, 5, 2, 6, 9, 7, 8, 1],
            [6, 8, 2, 5, 7, 1, 4, 9, 3],
            [1, 9, 7, 8, 3, 4, 5, 6, 2],
            [8, 2, 6, 1, 9, 5, 3, 4, 7],
            [3, 7, 4, 6, 8, 2, 9, 1, 5],
            [9, 5, 1, 7, 4, 3, 6, 2, 8],
            [5, 1, 9, 3, 2, 6, 8, 7, 4],
            [2, 4, 8, 9, 5, 7, 1, 3, 6],
            [7, 6, 3, 4, 1, 8, 2, 5, 9],
        ],
    },
    start: {
        input: `
             , , ,2,6, ,7, ,1
            6,8, , ,7, , ,9,
            1,9, , , ,4,5, ,
            8,2, ,1, , , ,4,
             , ,4,6, ,2,9, ,
             ,5, , , ,3, ,2,8
             , ,9,3, , , ,7,4
             ,4, , ,5, , ,3,6
            7, ,3, ,1,8, , , `,
        array: [
            [undefined, undefined, undefined, 2, 6, undefined, 7, undefined, 1],
            [6, 8, undefined, undefined, 7, undefined, undefined, 9, undefined],
            [1, 9, undefined, undefined, undefined, 4, 5, undefined, undefined],
            [8, 2, undefined, 1, undefined, undefined, undefined, 4, undefined],
            [undefined, undefined, 4, 6, undefined, 2, 9, undefined, undefined],
            [undefined, 5, undefined, undefined, undefined, 3, undefined, 2, 8],
            [undefined, undefined, 9, 3, undefined, undefined, undefined, 7, 4],
            [undefined, 4, undefined, undefined, 5, undefined, undefined, 3, 6],
            [7, undefined, 3, undefined, 1, 8, undefined, undefined, undefined],
        ],
    },
};

const solvableRawSudokus: Array<SolvableRawSudoku> = [
    sudoku1,
];

describe('Parsing sudoku', () => {
    const sudokuService = new SudokuService();
    let parsableSudokus: Array<SolvableRawSudoku>;
    let rawSudokus: Array<RawSudoku>;

    beforeEach(() => {
        parsableSudokus = [];
        rawSudokus = [];

        for (const solvableSudoku of solvableRawSudokus) {
            solvableSudoku.start.sudoku = sudokuService
                .parseSudoku(solvableSudoku.start.input);
            solvableSudoku.complete.sudoku = sudokuService
                .parseSudoku(solvableSudoku.complete.input);

            rawSudokus.push(solvableSudoku.complete, solvableSudoku.start);
        }
        parsableSudokus = solvableRawSudokus;
    });

    describe('minimum dimensions', () => {
        it('should have 9 rows', () => {
            const sudoku = sudokuService.parseSudoku('');
            assert.equal(sudoku.grid.length, 9,
                'Sudoku should consist of precisely 9 rows');
        });

        it('should have 9 columns', () => {
            const sudoku = sudokuService.parseSudoku(',');

            let i = 0;
            for (const row of sudoku.grid) {
                assert.equal(row.length, 9,
                    `Sudoku's row ${ i++ } should consist of precisely 9 columns`);
            }
        });
    });

    function checkSudokuValues(rawSudoku: Array<Array<number>>,
                               sudoku: Sudoku) {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                assert.equal(
                    sudoku.grid[r][c].value,
                    rawSudoku[r][c],
                    `Comparing cell (${r}, ${c})`,
                );
            }
        }
    }

    describe('cell values & indexes', () => {
        it('complete should be correct', () => {
            for (const sudoku of parsableSudokus) {
                checkSudokuValues(
                    sudoku.complete.array,
                    sudoku.complete.sudoku,
                );
            }
        });

        it('partial should be correct', () => {
            for (const sudoku of parsableSudokus) {
                checkSudokuValues(
                    sudoku.start.array,
                    sudoku.start.sudoku,
                );
            }
        });

        it('check indexes', () => {
            for (const rawSudoku of rawSudokus) {
                for (let r = 0; r < 9; r++) { // Don't rely on Cell.rowIndex
                    for (let c = 0; c < 9; c++) {
                        const cell = rawSudoku.sudoku.grid[r][c];
                        assert.equal(
                            cell.rowIndex,
                            r,
                            `Cell (${r}, ${c}) doesn't have the correct row index.`,
                        );
                        assert.equal(
                            cell.columnIndex,
                            c,
                            `Cell (${r}, ${c}) doesn't have the correct column index.`,
                        );
                    }
                }
            }
        });
    });

    describe('groups', () => {
        const getCellValue = (c: Cell) => c.value;
        it('rows should be correct', () => {
            for (const rawSudoku of rawSudokus) {
                for (let r = 0; r < 9; r++) { // Don't rely on Cell.rowIndex
                    for (let c = 0; c < 9; c++) {
                        assert.deepEqual(
                            rawSudoku.sudoku.grid[r][c].row.map(getCellValue),
                            rawSudoku.array[r],
                            `Row is not correct for cell (${r}, ${c}).`,
                        );
                    }
                }
            }
        });

        it('columns should be correct', () => {
            for (const rawSudoku of rawSudokus) {
                for (let r = 0; r < 9; r++) {
                    for (let c = 0; c < 9; c++) {
                        assert.deepEqual(
                            rawSudoku.sudoku.grid[r][c].column.map(getCellValue),
                            rawSudoku.array.map((a) => a[c]),
                            `Column is not correct for cell (${r}, ${c}).`,
                        );
                    }
                }
            }
        });

        it('blocks should be correct', () => {
            const getBlock = <T>(input: Array<Array<T>>, y1: number, x1: number,
                              y2: number, x2: number): Array<T> => {

                const result: Array<T> = [];

                for (let y = y1; y < y2; y++) {
                    for (let x = x1; x < x2; x++) {
                        result.push(input[y][x]);
                    }
                }

                return result;
            };

            for (const rawSudoku of rawSudokus) {
                for (let r = 0; r < 9; r++) {
                    for (let c = 0; c < 9; c++) {
                        const y1 = Math.floor(r / 3) * 3;
                        const x1 = Math.floor(c / 3) * 3;
                        const y2 = y1 + 3;
                        const x2 = x1 + 3;

                        assert.equal(rawSudoku.sudoku.grid[r][c].block.length, 9,
                            `Bock of cell(${r}, ${c}) doesn't have 9 cells`);
                        assert.deepEqual(
                            rawSudoku.sudoku.grid[r][c].block.map(getCellValue),
                            getBlock(rawSudoku.array, y1, x1, y2, x2),
                            `Cell (${r}, ${c}) should contain the following block:`
                            + `((${y1}, ${x1}), (${y2}, ${x2}))`,
                        );
                    }
                }
            }
        });
    });
});
