import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-detection-play',
  templateUrl: './change-detection-play.component.html',
  styleUrls: ['./change-detection-play.component.css'],
})
export class ChangeDetectionPlayComponent implements OnInit {
  get currentTime() {
    // return Date.now();
    return '';
  }

  constructor() {}

  ngOnInit(): void {}

  handleClick() {
    // this.currentTime = new Date();
    console.log(this.currentTime);
  }
}
