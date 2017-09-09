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

        input = input.replace('/ /g', '');
        const rowsData = input.split('\n');

        // Fill remaining rows
        while (rowsData.length < 9) {
            rowsData.push(','.repeat(8));
        }
        console.log(rowsData);

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

                // console.log(`Cell(${rIndex}, ${cIndex}): ${value}`);
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

        return sudoku;
    }
}
