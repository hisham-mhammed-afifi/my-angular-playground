import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    },
  ],
})
export class MultiSelectComponent implements OnInit, ControlValueAccessor {
  @Input() id = '';
  @Input() label = '';
  @Input() items: any[] = [];
  @Input() bindLabel = 'label';
  @Input() bindValue = 'value';
  @Input() placeholder: string = '';
  @Input() containerHeight: string = '40px';
  @Input() searchable: boolean = false;
  @Input() disabled: boolean = false;
  @Input() showSelectAll: boolean = false;

  @ContentChild('optionTemplate', { read: TemplateRef })
  optionTemplate!: TemplateRef<any>;
  @ContentChild('multiLabelTemplate', { read: TemplateRef })
  multiLabelTemplate!: TemplateRef<any>;

  selectedKeys: any[] = [];
  internalModel: any[] = []; // What ng-select sees
  private onChange = (value: any) => {};
  private onTouched = () => {};

  // Get items including Select All option if enabled
  get displayItems(): any[] {
    if (!this.showSelectAll) {
      return this.items;
    }

    const selectAllOption = {
      [this.bindLabel]: 'Select All',
      [this.bindValue]: '__SELECT_ALL__',
    };
    return [selectAllOption, ...this.items];
  }

  // Get only regular items (excluding Select All)
  get regularItems(): any[] {
    return this.items.filter(
      (item) => item[this.bindValue] !== '__SELECT_ALL__'
    );
  }

  ngOnInit() {
    if (!this.bindLabel || !this.bindValue) {
      console.warn('bindLabel and bindValue should be provided.');
    }
    this.updateInternalModel();
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    if (Array.isArray(value)) {
      this.selectedKeys = [...value.filter((val) => val !== '__SELECT_ALL__')];
    } else {
      this.selectedKeys = [];
    }
    this.updateInternalModel();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Update the internal model that ng-select uses
  private updateInternalModel(): void {
    // Always exclude __SELECT_ALL__ from the actual model
    this.internalModel =
      this.isAllSelected() && this.showSelectAll
        ? ['__SELECT_ALL__', ...this.selectedKeys]
        : [...this.selectedKeys];
  }

  // Handle option clicks manually
  onOptionClick(item: any, event: Event): void {
    if (this.disabled) return;

    event.preventDefault();
    event.stopPropagation();

    const itemValue = item[this.bindValue];

    if (itemValue === '__SELECT_ALL__') {
      this.toggleSelectAll();
    } else {
      this.toggleItem(itemValue);
    }
  }

  // Toggle Select All functionality
  private toggleSelectAll(): void {
    if (this.isAllSelected()) {
      // Deselect all
      this.selectedKeys = [];
    } else {
      // Select all
      this.selectedKeys = this.regularItems.map((item) => item[this.bindValue]);
    }

    this.updateInternalModel();
    this.emitChange();
  }

  // Toggle individual item
  private toggleItem(itemValue: any): void {
    const index = this.selectedKeys.indexOf(itemValue);

    if (index > -1) {
      // Item is selected, remove it
      this.selectedKeys.splice(index, 1);
    } else {
      // Item is not selected, add it
      this.selectedKeys.push(itemValue);
    }

    this.updateInternalModel();
    this.emitChange();
  }

  // Handle ng-select model changes (fallback for keyboard navigation)
  onModelChange(selectedValues: any[]): void {
    if (!selectedValues) {
      this.selectedKeys = [];
      this.updateInternalModel();
      this.emitChange();
      return;
    }

    // Filter out __SELECT_ALL__ from the actual selection
    const newSelection = selectedValues.filter(
      (val) => val !== '__SELECT_ALL__'
    );

    // Check if this change includes __SELECT_ALL__
    const hasSelectAll = selectedValues.includes('__SELECT_ALL__');

    if (hasSelectAll) {
      // If __SELECT_ALL__ is in the selection, it means user wants all items
      if (newSelection.length === this.regularItems.length) {
        // All items are selected
        this.selectedKeys = [...newSelection];
      } else {
        // Select all was clicked
        this.selectedKeys = this.regularItems.map(
          (item) => item[this.bindValue]
        );
      }
    } else {
      // Regular selection without Select All
      this.selectedKeys = [...newSelection];
    }

    this.updateInternalModel();
    this.emitChange();
  }

  // Check if item is selected
  isItemSelected(item: any): boolean {
    if (item[this.bindValue] === '__SELECT_ALL__') {
      return this.isAllSelected();
    }
    return this.selectedKeys.includes(item[this.bindValue]);
  }

  // Check if all items are selected
  isAllSelected(): boolean {
    if (this.regularItems.length === 0) return false;
    return (
      this.selectedKeys.length === this.regularItems.length &&
      this.regularItems.every((item) =>
        this.selectedKeys.includes(item[this.bindValue])
      )
    );
  }

  // Get display text for selected items
  selectedItemsLabels(): string {
    if (this.selectedKeys.length === 0) return '';

    if (this.isAllSelected() && this.showSelectAll) {
      return 'All items selected';
    }

    const selectedItems = this.regularItems.filter((item) =>
      this.selectedKeys.includes(item[this.bindValue])
    );

    if (selectedItems.length > 3) {
      return `${selectedItems.length} items selected`;
    }

    return selectedItems.map((item) => item[this.bindLabel]).join(', ');
  }

  // Emit changes to parent form
  private emitChange(): void {
    this.onChange([...this.selectedKeys]);
    this.onTouched();
  }

  // Handle focus for form validation
  onFocus(): void {
    this.onTouched();
  }

  trackByFn = (item: any) => item[this.bindValue];
}
