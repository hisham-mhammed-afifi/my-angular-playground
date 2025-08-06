import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-material-stepper',
  templateUrl: './material-stepper.component.html',
  styleUrls: ['./material-stepper.component.css'],
  providers: [{ provide: CdkStepper, useExisting: MaterialStepperComponent }],
})
export class MaterialStepperComponent extends CdkStepper implements OnInit {
  @Input() stepLabels: string[] = []; // Optional labels for steps

  ngOnInit(): void {}
}
