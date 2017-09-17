import { Component, OnInit } from '@angular/core';

import { SolverService } from './sudoku/shared/solver.service';
import { Sudoku } from './sudoku/shared/sudoku.model';
import { SudokuService } from './sudoku/shared/sudoku.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.min.css'],
})
export class AppComponent implements OnInit {
    public sudoku: Sudoku;
    public results: Array<string>;

    constructor(private sudokuService: SudokuService) {
        this.results = [];
    }

    ngOnInit(): void {
        this.sudokuService.getActiveSudoku()
            .subscribe(sudoku => {
                this.results = [];
                this.sudoku = sudoku;
            });
    }

    solve(): void {
        const solver = new SolverService(this.sudoku);
        solver.start();
    }

    runCompletePossibilityCheck(): void {
        this.results.push(`Possibilities were ${this.sudoku.runCompletePossibilityCheck()
            ? ''
            : 'not'} eliminated`);
    }

    runLPE(): void {
        this.results.push(`LPE eliminated ${this.sudoku.runLPE()} possibilities`);
    }

    runSingleSolver(): void {
        this.results.push(`Single solver filled in ${this.sudoku.runSinglePossibility()} cell(s)`);
    }

    runUniqueSolver(): void {
        this.results.push(`Unique solver filled in ${this.sudoku.runUniquePossibility()} cell(s)`);
    }
}
