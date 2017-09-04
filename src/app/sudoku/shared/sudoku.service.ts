import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

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
}
