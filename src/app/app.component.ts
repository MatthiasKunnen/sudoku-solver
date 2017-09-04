import { Component, OnInit } from '@angular/core';

import { Sudoku } from './sudoku/shared/sudoku.model';
import { SudokuService } from './sudoku/shared/sudoku.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.min.css'],
})
export class AppComponent implements OnInit {
    public sudoku: Sudoku;

    constructor(private sudokuService: SudokuService) {
    }

    ngOnInit(): void {
        this.sudokuService.getActiveSudoku().subscribe(sudoku => this.sudoku = sudoku);
    }
}
