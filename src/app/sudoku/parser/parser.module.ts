import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SudokuParserComponent } from './parser.component';
import { SudokuService } from '../shared/sudoku.service';
import { SudokuModule } from '../sudoku/sudoku.module';

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
