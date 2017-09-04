import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SudokuCellComponent } from './cell.component';

@NgModule({
    declarations: [
        SudokuCellComponent,
    ],
    exports: [
        SudokuCellComponent,
    ],
    imports: [
        BrowserModule,
    ],
    providers: [],
})
export class CellModule {
}
