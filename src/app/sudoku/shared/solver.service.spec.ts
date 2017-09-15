import { assert } from 'chai';

import { SolverService } from './solver.service';
import { sudoku1 } from './sudoku-parser.spec';
import { Sudoku } from './sudoku.model';
import { SudokuService } from './sudoku.service';

const sudokuService = new SudokuService();

describe('Solver', () => {
    describe('conventional methods', () => {
        it('should solve', (done) => {
            const sudoku = sudokuService.parseSudoku(sudoku1.start.input);
            const sudokuSolved = sudokuService.parseSudoku(sudoku1.complete.input);
            const solverService = new SolverService(sudoku, {
                completionCallback: (s: Sudoku) => {
                    assert.deepEqual(sudoku.cells.map(c => c.value),
                        sudokuSolved.cells.map(c => c.value));
                    done();
                },
            });
            solverService.start();
        });

        it('shouldn\'t solve', (done) => {
            const sudoku = sudokuService.parseSudoku('');
            const sudokuEndState = sudokuService.parseSudoku('');
            const solverService = new SolverService(sudoku, {
                completionCallback: (s: Sudoku) => {
                    assert.deepEqual(sudoku.cells.map(c => c.value),
                        sudokuEndState.cells.map(c => c.value));
                    done();
                },
            });
            solverService.start();
        });
    });
});
