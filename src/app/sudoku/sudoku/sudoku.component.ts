import { Component, Input } from '@angular/core';
import { Sudoku } from '../shared/sudoku.model';

@Component({
    selector: 'app-sudoku',
    templateUrl: './sudoku.component.html',
    styleUrls: ['./sudoku.component.min.css'],
})
export class SudokuComponent {
    @Input() public sudoku: Sudoku;
    @Input() public displayPossibilities = true;
}
