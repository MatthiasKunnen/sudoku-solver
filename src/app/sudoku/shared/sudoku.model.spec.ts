import { assert } from 'chai';

import {
    checkSudokuPossibilities,
    minimalSudokuChecks,
    minimalSudokuInput,
} from './cell.model.spec';
import { sudoku1 } from './sudoku-parser.spec';
import { Sudoku } from './sudoku.model';
import { SudokuService } from './sudoku.service';

const sudokuService = new SudokuService();

describe('Sudoku', () => {
    describe('Value validity', () => {
        let invalidSudokus: Array<[Sudoku, string]>;
        let validSudokus: Array<Sudoku>;

        beforeEach(() => {
            invalidSudokus = [];
            invalidSudokus.push([sudokuService.parseSudoku(`
                1,,,1
            `), 'Row should be invalid.']);
            invalidSudokus.push([sudokuService.parseSudoku(`
                1

                1
            `), 'Column should be invalid.']);
            invalidSudokus.push([sudokuService.parseSudoku(`
                1
                 ,1
            `), 'Block should be invalid.']);

            validSudokus = [];
            validSudokus.push(sudokuService.parseSudoku(minimalSudokuInput));
            validSudokus.push(sudokuService.parseSudoku(sudoku1.complete.input));
            validSudokus.push(sudokuService.parseSudoku(sudoku1.start.input));
        });

        it('should detect invalid sudokus', () => {
            for (const sudoku of invalidSudokus) {
                assert.isFalse(sudoku[0].areValuesValid(), sudoku[1]);
            }
        });

        it('should approve valid sudokus', () => {
            for (const sudoku of validSudokus) {
                assert.isTrue(sudoku.areValuesValid());
            }
        });
    });

    describe('possibility check', () => {
        it('should succeed', () => {
            const sudoku = sudokuService.parseSudoku(minimalSudokuInput);
            sudoku.runCompletePossibilityCheck();
            checkSudokuPossibilities(sudoku.grid, minimalSudokuChecks);
        });

        it('should fail', () => {
            const sudoku = sudokuService.parseSudoku(minimalSudokuInput);
            sudoku.runCompletePossibilityCheck();
            sudoku.grid[8][8].possibilities.push(0);
            checkSudokuPossibilities(sudoku.grid, minimalSudokuChecks, false);
        });
    });

    describe('Linear Possibility Elimination', () => {
        let sudoku: Sudoku;
        let sudokuCopy: Sudoku;

        beforeEach(() => {
            sudoku = sudokuService.parseSudoku(minimalSudokuInput);
            sudokuCopy = sudokuService.parseSudoku(minimalSudokuInput);
        });

        it('sudokus should equal each other before modification', () => {
            assert.deepEqual(sudokuCopy, sudoku);
        });

        it('cell (6, 0) shouldn\'t have 7 as a possibility.', () => {
            assert.isFalse(sudoku.runLPE() > 1,
                'LPE eliminated more than 1 possibility.');
            assert.notInclude(sudoku.grid[0][6].possibilities, 7,
                `LPE didn't eliminate '7' as a possibility.`);
        });

        it('LPE shouldn\'t have side effects', () => {
            sudoku.runLPE();

            // Reinstate normal changes
            sudoku.grid[0][6].possibilities = sudokuCopy.grid[0][6].possibilities;

            assert.deepEqual(sudoku, sudokuCopy, 'Side effects are caused by LPE.');
        });
    });

    describe('Unique possibility', () => {
        it('should be eliminated', () => {
            pending();
        });
    });

    describe('Single possibility', () => {
        it('should be eliminated', () => {
            pending();
        });
    });
});
