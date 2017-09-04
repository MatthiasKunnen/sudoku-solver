import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SudokuComponent } from './sudoku.component';
import { CellModule } from '../cell/cell.module';

@NgModule({
    declarations: [
        SudokuComponent,
    ],
    exports: [
        SudokuComponent,
    ],
    imports: [
        BrowserModule,
        CellModule,
    ],
    providers: [],
})
export class SudokuModule {
}
