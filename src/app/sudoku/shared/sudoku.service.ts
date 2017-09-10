import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { Cell } from './cell.model';
import { Sudoku } from './sudoku.model';

@Injectable()
export class SudokuService {
    private activeSudoku: Observable<Sudoku>;
    private activeSudokuObserver: Observer<Sudoku>;

    public constructor() {
        this.activeSudoku = new Observable<Sudoku>(observer => {
            this.activeSudokuObserver = observer;
        });
    }

    public getActiveSudoku(): Observable<Sudoku> {
        return this.activeSudoku;
    }

    public setActiveSudoku(sudoku: Sudoku): void {
        this.activeSudokuObserver.next(sudoku);
    }

    public parseSudoku(input: string): Sudoku {
        const sudoku = new Sudoku();

        input = input.trim().replace(/ /g, '');
        const rowsData = input.split('\n');

        // Fill remaining rows
        while (rowsData.length < 9) {
            rowsData.push(','.repeat(8));
        }

        rowsData.forEach((rowData, rIndex) => {
            if (rIndex === 9) {
                throw new RangeError('Sudoku cannot exceed 9 rows');
            }

            const row: Array<Cell> = Array();
            const cells = rowData.split(',');

            // Fill remaining columns
            while (cells.length < 9) {
                cells.push('');
            }

            cells.forEach((value, cIndex) => {
                if (cIndex === 9) {
                    throw new RangeError('Sudoku cannot exceed 9 columns');
                }

                const cell = new Cell({
                    rowIndex: rIndex,
                    columnIndex: cIndex,
                });

                if (value !== '') {
                    cell.value = Number(value);
                }

                row.push(cell);
            });

            sudoku.grid.push(row);
        });

        // Calculate columns first to prevent excessive looping
        for (let c = 0; c < 9; c++) {
            sudoku.columns.push(sudoku.grid.map((row) => row[c]));
        }

        // Set sudoku blocks
        for (let r = 0; r < 9; r += 3) {
            for (let c = 0; c < 9; c += 3) {
                const block: Array<Cell> = [];
                const y2 = r + 2;
                const x2 = c + 2;

                for (let y = r; y <= y2; y++) {
                    for (let x = c; x <= x2; x++) {
                        block.push(sudoku.grid[y][x]);
                    }
                }

                sudoku.blocks.push(block);
            }
        }

        // Set cell groups
        sudoku.grid.forEach((row, rIndex) => {
            row.forEach((cell, cIndex) => {
                cell.row = row; // Set rows
                cell.column = sudoku.columns[cIndex]; // Set columns

                // Set block
                const y1 = Math.floor(rIndex / 3) * 3;
                const x1 = Math.floor(cIndex / 3);

                cell.block = sudoku.blocks[y1 + x1];
            });
        });

        return sudoku;
    }
}
