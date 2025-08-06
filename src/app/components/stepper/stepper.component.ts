import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent implements OnInit {
  @Input() steps: {
    title: string;
    state?: 'default' | 'active' | 'completed' | 'disabled' | 'error';
  }[] = [];
  @Input() activeStep: number = 0; // Current active step index
  @Input() customStepTemplate?: TemplateRef<any>; // Optional custom template
  @Input() connectorStyle: any = {}; // Custom connector styles
  @Input() stepStyle: any = {}; // Custom step styles
  @Input() allowStepNavigation: boolean = true; // Allow/disallow clicking on steps

  @Output() activeStepChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private testSrv: TestService) {}

  ngOnInit(): void {}

  navigateToStep(index: number): void {
    if (
      this.allowStepNavigation &&
      index >= 0 &&
      index < this.steps.length &&
      this.steps[index]?.state !== 'disabled'
    ) {
      this.activeStep = index;
      this.activeStepChange.emit(this.activeStep);
    }
  }
}
