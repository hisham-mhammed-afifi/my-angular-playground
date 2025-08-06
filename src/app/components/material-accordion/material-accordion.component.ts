import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-material-accordion',
  templateUrl: './material-accordion.component.html',
  styleUrls: ['./material-accordion.component.css'],
})
export class MaterialAccordionComponent implements OnInit {
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  expandedIndex = 0;

  constructor() {}

  ngOnInit(): void {}
}
