import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SudokuModule } from './sudoku/sudoku/sudoku.module';
import { SudokuService } from './sudoku/shared/sudoku.service';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        SudokuModule,
    ],
    providers: [SudokuService],
    bootstrap: [AppComponent],
})
export class AppModule {
}
