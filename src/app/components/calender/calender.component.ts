import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'],
})
export class CalenderComponent implements OnInit {
  range = [new Date(), new Date()];

  ranges: any[] = [
    {
      value: [
        new Date(new Date().setDate(new Date().getDate() - 7)),
        new Date(),
      ],
      label: 'Last 7 Days',
    },
    {
      value: [
        new Date(),
        new Date(new Date().setDate(new Date().getDate() + 7)),
      ],
      label: 'Next 7 Days',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  selectRange(range: (Date | undefined)[] | undefined) {
    console.log(range);
  }
}
