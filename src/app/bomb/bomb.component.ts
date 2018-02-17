import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'bomb',
  templateUrl: './bomb.component.html',
  styleUrls: ['./bomb.component.css']
})
export class BombComponent implements OnInit, OnDestroy {

  public bombData: any = new Object();
  public isExploded: boolean = false;
  public isExtinguished: boolean = false;
  private serviceSubscription;

  @Input('data') bomb: any;

  constructor(private mainService: MainService) {

  }

  ngOnInit() {
    if (this.bomb) {
      this.bombData.id = this.bomb.id;
      this.bombData.ExplodeTime = this.bomb.ExplodeTime;
      this.bombData.Type = this.bomb.Type;
      this.bombData.Position = this.bomb.Position;
    }
    this.serviceSubscription = this.mainService.countDown.subscribe(tick => {
      this.bombData.ExplodeTime--;
      if (this.bombData.ExplodeTime <= 0) {
        this.unsubscribeService();
        if (!this.isExtinguished)
          this.mainService.explodeBomb(this.bomb);
      }
    })

    this.mainService.explodeQueue.subscribe(bomb => {
      this.destroyBomb(bomb);
    })
    this.mainService.extinguishQueue.subscribe(bomb => {
      this.destroyBomb(bomb);
    })
  }

  destroyBomb(bomb) {
    if (this.bomb.id === bomb.id) {
      this.isExploded = true;
      this.isExtinguished = true;
    }
  }

  unsubscribeService() {
    this.serviceSubscription.unsubscribe();
  }

  ngOnDestroy() {
    this.unsubscribeService();
  }
}
