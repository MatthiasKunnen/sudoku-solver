import { Component } from '@angular/core';

import { Sudoku } from '../shared/sudoku.model';
import { SudokuService } from '../shared/sudoku.service';

@Component({
    selector: 'app-sudoku-parser',
    templateUrl: './parser.component.html',
    styleUrls: ['./parser.component.min.css'],
})
export class SudokuParserComponent {

    public isVisible = true;
    public sudokuInputValid = true;
    public sudokuInputErrors: Array<string> = [];
    public sudoku: Sudoku;

    public constructor(private sudokuService: SudokuService) {
    }

    public onSudokuInputChange(input: string) {
        this.sudokuInputValid = true;
        this.sudokuInputErrors = [];
        if (input.match(/[^\s+|,|\d]/) !== null) {
            this.sudokuInputValid = false;
            this.sudokuInputErrors.push('Input contains illegal characters. ' +
                'Only comma, space and numbers allowed.');
        }

        if (input.match(/[0]/) !== null) {
            this.sudokuInputValid = false;
            this.sudokuInputErrors.push('The character "0" is not allowed.');
        }

        if (input.match(/[0-9]{2,}/) !== null) {
            this.sudokuInputValid = false;
            this.sudokuInputErrors.push('Allowed numbers are 1 to 9.');
        }

        if (!this.sudokuInputValid) {
            return;
        }

        try {
            this.sudoku = this.sudokuService.parseSudoku(input);
        } catch (e) {
            if (e instanceof RangeError) {
                this.sudokuInputValid = false;
                this.sudokuInputErrors.push(e.message);
            }
        }
    }

    public onSubmit() {
        console.log('submitted');
        this.sudokuService.setActiveSudoku(this.sudoku);
        this.isVisible = false;
    }

    public toggleVisible() {
        this.isVisible = !this.isVisible;
    }
}
