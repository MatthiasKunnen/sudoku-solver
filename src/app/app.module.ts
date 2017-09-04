import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SudokuModule } from './sudoku/sudoku/sudoku.module';
import { SudokuService } from './sudoku/shared/sudoku.service';
import { SudokuParserModule } from './sudoku/parser/parser.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        SudokuModule,
        SudokuParserModule,
    ],
    providers: [SudokuService],
    bootstrap: [AppComponent],
})
export class AppModule {
}
