import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { Cell } from './cell.model';
import { Sudoku } from './sudoku.model';

export class SolverService {
    public completionCallback: (sudoku: Sudoku) => void;
    public enableBranching = false;

    private logObservable: Observable<string>;
    private logObserver: Observer<string>;
    private solved = false;
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
        this.sudoku.runCompletePossibilityCheck();

        // Run loop until it fails, then try LPE
        while (!this.solved && (this.loop() || this.sudoku.runLPE() > 0)) {
            this.loop();
        }

        if (this.completionCallback !== undefined) {
            this.completionCallback(this.sudoku);
        }
    }

    /**
     * Start a solving loop. When false is returned, the sudoku cannot be
     * further solved using conventional methods.
     * @returns {boolean} true if a change occurred. False otherwise.
     */
    private loop(): boolean {
        let changed = false;
        while (this.sudoku.runUniquePossibility() > 0) {
            changed = true;
        }

        if (this.sudoku.isSolved()) {
            this.solved = true;
            return true;
        }

        while (this.sudoku.runSinglePossibility() > 0) {
        }

        if (this.sudoku.isSolved()) {
            this.solved = true;
            return true;
        }

        return changed;
    }
}
