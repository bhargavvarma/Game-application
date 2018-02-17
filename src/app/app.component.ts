import { Component, ViewChild } from '@angular/core';
import { MainService } from './services/main.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import * as $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MainService]
})
export class AppComponent {

  private bucketTimer = 0;
  public bucketCount = 40;
  private bombSpawnTime = 5;
  private bombSpwanTicks = 0;
  private totalBombs = 120;
  countDown;
  public bombs: any[] = [];
  public buckets: any[] = [];

  @ViewChild('#bombArea') bombArea: HTMLElement;

  private colors: string[] = ['red', 'green', 'blue'];
  private score: number = 0;
  private timerSubscription;

  constructor(private mainService: MainService) {
    let frequency = (this.bombSpawnTime - 0.5) / (this.totalBombs - 1)
    this.bombSpwanTicks = this.bombSpawnTime;
    this.timerSubscription = mainService.countDown.subscribe(tick => {
      // console.log(tick);
      if (tick > this.bombSpwanTicks) {
        this.spawnBomb();
        this.bombSpawnTime = this.bombSpawnTime - frequency
        this.bombSpwanTicks += this.bombSpawnTime;
      }

      if (this.bucketCount <= 0) {
        this.bucketCount = 40;
        this.buckets = this.shuffleBuckets(this.buckets);
        this.startBucketTimer();
      }

      if (this.bombs.length >= this.totalBombs) {
        this.timerSubscription.unsubscribe();
      }
    })

    this.setupBuckets();
    this.startBucketTimer();

    this.mainService.extinguishQueue.subscribe(bomb => {
      this.setScore(1);
    });

    this.mainService.explodeQueue.subscribe(bomb => {
      this.setScore(-1);
    });
  }

  startBucketTimer() {
    this.countDown = Observable.timer(0, 1000)
      .take(this.bucketCount)
      .map(() => --this.bucketCount);

  }
  setupBuckets() {
    this.buckets = [];
    let tempbuckets = [];
    let redBucket = {
      Type: 'red'
    }
    let blueBucket = {
      Type: 'blue'
    }
    let greenBucket = {
      Type: 'green'
    }
    tempbuckets.push(redBucket);
    tempbuckets.push(blueBucket);
    tempbuckets.push(greenBucket);
    this.buckets = this.shuffleBuckets(tempbuckets);
  }

  shuffleBuckets(buckets) {
    var currentIndex = buckets.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = buckets[currentIndex];
      buckets[currentIndex] = buckets[randomIndex];
      buckets[randomIndex] = temporaryValue;
    }

    return buckets;
  }


  setScore(score) {
    if (score > 0)
      this.score += 1;
    else {
              this.score -= 1;
          }
  }

  spawnBomb() {

    let bomb = {
      id: this.bombs.length + 1,
      ExplodeTime: this.getRandomInt(5, 10),
      Type: this.colors[Math.floor(Math.random() * this.colors.length)],
      Position: this.getBombposition()
    }
    // console.log(bomb.Position);
    this.bombs.push(bomb);
  }

  getBombposition() {
    let bombAreaElement = $('.bombArea');
    let bombAreaPos = bombAreaElement.position();
    // console.log(bombAreaPos);
    let pos = {
      Top: this.getRandomInt(bombAreaPos.top, bombAreaPos.top + bombAreaElement[0].clientHeight - 120),
      Left: this.getRandomInt(bombAreaPos.left, bombAreaPos.left + bombAreaElement[0].clientWidth - 120),
    }
    return pos;
  }

  getRandomInt(min, max) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  }


}
