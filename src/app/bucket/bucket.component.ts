import { Component, OnInit, Input } from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent implements OnInit {

  @Input('data') bucket: any;
  constructor(private mainService: MainService) { }

  ngOnInit() {
  }

  onBombDrop(e) {
    debugger;
    let bomb = e.dragData;
    if (this.bucket.Type === bomb.Type) {
      this.mainService.extinguishBomb(bomb);
    } else {
      this.mainService.explodeBomb(bomb);
    }
  }
}
