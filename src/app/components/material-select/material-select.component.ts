import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-material-select',
  templateUrl: './material-select.component.html',
  styleUrls: ['./material-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MaterialSelectComponent),
      multi: true,
    },
  ],
})
export class MaterialSelectComponent implements OnInit, ControlValueAccessor {
  fontOptions: string[] = [
    'Arial (sans-serif)',
    'Verdana (sans-serif)',
    'Times New Roman (serif)',
    'Courier New (monospace)',
    'Georgia (serif)',
  ];

  selectedOption: string | null = null;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {}

  ngOnInit(): void {}

  onSelect(option: string): void {
    this.selectedOption = option;
    this.onChange(option); // Notify the parent form control
    this.onTouched(); // Mark as touched
  }

  // ControlValueAccessor methods
  writeValue(value: string): void {
    this.selectedOption = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Handle the disabled state if needed
  }
}
