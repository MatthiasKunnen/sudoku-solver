import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { Cell } from './cell.model';
import { Sudoku } from './sudoku.model';

export class SolverService {
    public completionCallback: (sudoku: Sudoku) => void;
    public enableBranching = false;

    private logObservable: Observable<string>;
    private logObserver: Observer<string>;
    private sudoku: Sudoku;

    public constructor(sudoku: Sudoku, config?: Partial<SolverService>) {
        Object.assign(this, config);
        this.sudoku = sudoku;
        this.logObservable = new Observable<string>(observer => {
            this.logObserver = observer;
        });
    }

    public getOptimalBranchingCell(): Cell {
        throw Error('Not implemented');
    }

    /**
     * Start solving the sudoku.
     */
    public start() {
        throw Error('Not implemented');
    }
}
