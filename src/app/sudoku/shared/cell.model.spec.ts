import { assert } from 'chai';
import { asSequence } from 'sequency';

import { Cell } from './cell.model';
import { SolvableRawSudoku, sudoku1 } from './sudoku-parser.spec';
import { Sudoku } from './sudoku.model';
import { SudokuService } from './sudoku.service';

const sudokuService = new SudokuService();
export const minimalSudokuInput = `
     ,1,4
     ,9,2
    8,6,3



     ,5,1
    3,2
    4,8,9
`;
export const minimalSudokuChecks: Array<[[number, number], Array<number>]> = [
    // [[row, col], [possibilities]]
    [[0, 0], [5, 7]],
    [[0, 3], [2, 3, 5, 6, 7, 8, 9]],
    [[0, 4], [2, 3, 5, 6, 7, 8, 9]],
    [[0, 5], [2, 3, 5, 6, 7, 8, 9]],
    [[0, 6], [2, 3, 5, 6, 7, 8, 9]],
    [[0, 7], [2, 3, 5, 6, 7, 8, 9]],
    [[0, 8], [2, 3, 5, 6, 7, 8, 9]],

    [[1, 0], [5, 7]],
    [[1, 3], [1, 3, 4, 5, 6, 7, 8]],
    [[1, 4], [1, 3, 4, 5, 6, 7, 8]],
    [[1, 5], [1, 3, 4, 5, 6, 7, 8]],
    [[1, 6], [1, 3, 4, 5, 6, 7, 8]],
    [[1, 7], [1, 3, 4, 5, 6, 7, 8]],
    [[1, 8], [1, 3, 4, 5, 6, 7, 8]],

    [[2, 3], [1, 2, 4, 5, 7, 9]],
    [[2, 4], [1, 2, 4, 5, 7, 9]],
    [[2, 5], [1, 2, 4, 5, 7, 9]],
    [[2, 6], [1, 2, 4, 5, 7, 9]],
    [[2, 7], [1, 2, 4, 5, 7, 9]],
    [[2, 8], [1, 2, 4, 5, 7, 9]],

    [[3, 0], [1, 2, 5, 6, 7, 9]],
    [[3, 1], [3, 4, 7]],
    [[3, 2], [5, 6, 7, 8]],
    [[3, 3], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
    [[3, 4], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
    [[3, 5], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
    [[3, 6], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
    [[3, 7], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
    [[3, 8], [1, 2, 3, 4, 5, 6, 7, 8, 9]],

    [[4, 0], [1, 2, 5, 6, 7, 9]],
    [[4, 1], [3, 4, 7]],
    [[4, 2], [5, 6, 7, 8]],
    [[4, 3], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
    [[4, 4], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
    [[4, 5], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
    [[4, 6], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
    [[4, 7], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
    [[4, 8], [1, 2, 3, 4, 5, 6, 7, 8, 9]],

    [[5, 0], [1, 2, 5, 6, 7, 9]],
    [[5, 1], [3, 4, 7]],
    [[5, 2], [5, 6, 7, 8]],
    [[5, 3], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
    [[5, 4], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
    [[5, 5], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
    [[5, 6], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
    [[5, 7], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
    [[5, 8], [1, 2, 3, 4, 5, 6, 7, 8, 9]],

    [[6, 0], [6, 7]],
    [[6, 3], [2, 3, 4, 6, 7, 8, 9]],
    [[6, 4], [2, 3, 4, 6, 7, 8, 9]],
    [[6, 5], [2, 3, 4, 6, 7, 8, 9]],
    [[6, 6], [2, 3, 4, 6, 7, 8, 9]],
    [[6, 7], [2, 3, 4, 6, 7, 8, 9]],
    [[6, 8], [2, 3, 4, 6, 7, 8, 9]],
    [[6, 8], [2, 3, 4, 6, 7, 8, 9]],

    [[7, 2], [6, 7]],
    [[7, 3], [1, 4, 5, 6, 7, 8, 9]],
    [[7, 4], [1, 4, 5, 6, 7, 8, 9]],
    [[7, 5], [1, 4, 5, 6, 7, 8, 9]],
    [[7, 6], [1, 4, 5, 6, 7, 8, 9]],
    [[7, 7], [1, 4, 5, 6, 7, 8, 9]],
    [[7, 8], [1, 4, 5, 6, 7, 8, 9]],

    [[8, 3], [1, 2, 3, 5, 6, 7]],
    [[8, 4], [1, 2, 3, 5, 6, 7]],
    [[8, 5], [1, 2, 3, 5, 6, 7]],
    [[8, 6], [1, 2, 3, 5, 6, 7]],
    [[8, 7], [1, 2, 3, 5, 6, 7]],
    [[8, 8], [1, 2, 3, 5, 6, 7]],
];

/**
 * Checks a sudoku's possibilities.
 * @param {Array<Array<Cell>>} grid
 * @param {Array<[[number, number], Array<number>]>} checks
 * @param {boolean} checkEqual True when checking for deepEqual,
 * false to check for notDeepEqual.
 */
export const checkSudokuPossibilities = (grid: Array<Array<Cell>>,
                                         checks: Array<[[number, number], Array<number>]>,
                                         checkEqual: boolean = true) => {
    const deepCheck = checkEqual ? assert.deepEqual : assert.notDeepEqual;

    const actualPossibilities: Array<Array<number>> = [];
    const expectedPossibilities: Array<Array<number>> = [];

    for (const check of checks) {
        actualPossibilities.push(grid[check[0][0]][check[0][1]].possibilities);
        expectedPossibilities.push(check[1]);
    }

    deepCheck(actualPossibilities, expectedPossibilities);
};

describe('Cell', () => {
    describe('groups', () => {
        let sudokus: Array<Sudoku>;

        beforeEach(() => {
            sudokus = [
                sudokuService.parseSudoku(sudoku1.complete.input),
                sudokuService.parseSudoku(sudoku1.start.input),
            ];
        });

        it('should match', () => {
            for (const sudoku of sudokus) {
                const cell = sudoku.grid[0][0];
                const cValue = (c: Cell) => c.value || 0;

                const rowSum = asSequence(cell.row).sumBy(cValue);
                const colSum = asSequence(cell.column).sumBy(cValue);
                const blockSum = asSequence(cell.block).sumBy(cValue);

                const combinedGroups = asSequence(cell.getGroups())
                    .reduce((acc: Array<Cell>, group: Array<Cell>) => {
                        return acc.concat(group);
                    });
                const groupSum = asSequence(combinedGroups).sumBy(cValue);

                assert.equal(groupSum, rowSum + colSum + blockSum,
                    'Groups do not correctly represent block, column and row');
            }
        });
    });

    describe('Possibility computation', () => {
        const sudokus: Array<SolvableRawSudoku> = [
            sudoku1,
        ];
        let minimalSudoku: Sudoku;

        beforeEach(() => {
            for (const sudoku of sudokus) {
                sudoku.complete.sudoku = sudokuService.parseSudoku(sudoku.complete.input);
                sudoku.start.sudoku = sudokuService.parseSudoku(sudoku.start.input);
            }
            minimalSudoku = sudokuService.parseSudoku(minimalSudokuInput);
        });

        it('complete shouldn\'t have any modifications', () => {
            for (const sudoku of sudokus) {
                for (const row of sudoku.complete.sudoku.grid) {
                    for (const cell of row) {
                        assert.isFalse(cell.computePossibilities(),
                            `Cell (${cell.rowIndex}, ${cell.columnIndex}) shouldn't`
                            + ` have any changed possibilities`);
                    }
                }
            }
        });

        it('possibilities should be calculated correctly', () => {
            const grid: Array<Array<Cell>> = minimalSudoku.grid;
            for (const row of grid) {
                for (const cell of row) {
                    cell.computePossibilities();
                }
            }

            checkSudokuPossibilities(grid, minimalSudokuChecks);
        });
    });

    describe('eliminate possibility', () => {
        it('should succeed', () => {
            const c1 = new Cell({
                possibilities: [1],
            });

            assert.isTrue(c1.eliminatePossibility(1));
            for (let i = 1; i <= 9; i++) {
                assert.isFalse(c1.eliminatePossibility(i));
            }
        });
    });

    describe('Value changed propagation', () => {
        it('should propagate correctly', () => {
            const sudoku = sudokuService.parseSudoku(``);
            const cell = sudoku.grid[0][0];
            const newValue = 5;
            cell.value = 5;
            cell.propagateValueChange();
            for (const group of cell.getGroups()) {
                assert.isFalse(asSequence(group)
                    .any((c: Cell) => c.possibilities.includes(newValue)));
            }
        });
    });
});
