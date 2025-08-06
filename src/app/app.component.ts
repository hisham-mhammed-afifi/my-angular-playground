import {
  Component,
  OnInit,
  ViewChildren
} from '@angular/core';
import { MatTabLink } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChildren(MatTabLink) tabLinks?: MatTabLink[];

  onStepChange(step: number) {}

  constructor(public router: Router) {
    console.log(router.url);
  }

  ngOnInit(): void {}
}
