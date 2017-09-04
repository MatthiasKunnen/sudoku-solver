import { Component, Input } from '@angular/core';

import { Cell } from '../shared/cell.model';

@Component({
    selector: 'app-sudoku-cell',
    templateUrl: './cell.component.html',
    styleUrls: ['./cell.component.min.css'],
})
export class SudokuCellComponent {
    @Input() public cell: Cell;

    public possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}
