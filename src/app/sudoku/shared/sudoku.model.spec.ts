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

    describe('solve status', () => {
        it('should be solved', () => {
            const sudoku = sudokuService.parseSudoku(sudoku1.complete.input);
            assert.isTrue(sudoku.isSolved());
        });
        it('should be unsolved', () => {
            const sudoku = sudokuService.parseSudoku(sudoku1.start.input);
            assert.isFalse(sudoku.isSolved());
        });
    });

    describe('Linear Possibility Elimination', () => {
        let sudoku: Sudoku;
        let sudokuCopy: Sudoku;

        beforeEach(() => {
            sudoku = sudokuService.parseSudoku(minimalSudokuInput);
            sudoku.runCompletePossibilityCheck();
            sudokuCopy = sudokuService.parseSudoku(minimalSudokuInput);
            sudokuCopy.runCompletePossibilityCheck();
        });

        it('sudokus should equal each other before modification', () => {
            assert.deepEqual(sudokuCopy, sudoku);
        });

        it('cell (6, 0) shouldn\'t have 7 as a possibility.', () => {
            assert.equal(sudoku.runLPE(), 7,
                'LPE didn\'t eliminated exactly 7 possibilities.');
            assert.notInclude(sudoku.grid[6][0].possibilities, 7,
                `LPE didn't eliminate '7' as a possibility.`);
        });
    });

    describe('Single possibility', () => {
        it('should have value after run', () => {
            const sudoku = sudokuService.parseSudoku(`
                1,2,3,4,5,6,7


                 , , , , , , , ,8
            `);
            sudoku.runCompletePossibilityCheck();
            sudoku.runSinglePossibility();

            assert.equal(sudoku.grid[0][8].value, 9,
                'Value "9" expected at (0, 9).');
        });
    });

    describe('Unique possibility', () => {
        it('should have value after run', () => {
            const sudoku = sudokuService.parseSudoku(`
                 ,1



                1

                 , , ,1
                 , , , , , ,1
            `);
            sudoku.runCompletePossibilityCheck();
            sudoku.runUniquePossibility();

            assert.equal(sudoku.grid[8][2].value, 1,
                'Value "5" expected at (8, 2).');
        });
    });
});
