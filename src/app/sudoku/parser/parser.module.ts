import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { SudokuService } from '../shared/sudoku.service';
import { SudokuModule } from '../sudoku/sudoku.module';
import { SudokuParserComponent } from './parser.component';

@NgModule({
    declarations: [
        SudokuParserComponent,
    ],
    exports: [
        SudokuParserComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        SudokuModule,
    ],
    providers: [SudokuService],
})
export class SudokuParserModule {
}
