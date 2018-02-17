import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MainService {

    countDown;
    private totalTicks = 1000;
    public extinguishQueue = new BehaviorSubject(0);
    public explodeQueue = new BehaviorSubject(0);

    constructor() {
        console.log("MainService Constructor Called");
        this.countDown = Observable.timer(0, 1000)
            .take(this.totalTicks);
    }

    extinguishBomb(bomb) {
        this.extinguishQueue.next(bomb);
    }

    explodeBomb(bomb) {
        this.explodeQueue.next(bomb);
    }
}