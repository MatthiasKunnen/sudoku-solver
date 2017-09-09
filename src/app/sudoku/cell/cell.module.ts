import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
