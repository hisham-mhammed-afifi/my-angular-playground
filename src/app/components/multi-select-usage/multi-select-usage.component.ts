import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-multi-select-usage',
  templateUrl: './multi-select-usage.component.html',
  styleUrls: ['./multi-select-usage.component.css'],
})
export class MultiSelectUsageComponent implements OnInit {
  demoForm!: FormGroup;

  // Sample data
  basicItems = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
    { label: 'Option 4', value: 4 },
    { label: 'Option 5', value: 5 },
    { label: 'Option 6', value: 6 },
    { label: 'Option 7', value: 7 },
    { label: 'Option 8', value: 8 },
  ];

  categoryItems = [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Books', value: 'books' },
    { label: 'Sports', value: 'sports' },
    { label: 'Home & Garden', value: 'home' },
    { label: 'Toys', value: 'toys' },
    { label: 'Health & Beauty', value: 'health' },
    { label: 'Jewelry', value: 'jewelry' },
    { label: 'Automotive', value: 'automotive' },
  ];

  userItems = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://avatar.iran.liara.run/public?id=1',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://avatar.iran.liara.run/public?id=2',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      avatar: 'https://avatar.iran.liara.run/public?id=3',
    },
    {
      id: 4,
      name: 'Alice Brown',
      email: 'alice@example.com',
      avatar: 'https://avatar.iran.liara.run/public?id=4',
    },
    {
      id: 5,
      name: 'Charlie Miller',
      email: 'charlie@example.com',
      avatar: 'https://avatar.iran.liara.run/public?id=5',
    },
  ];

  tagItems = [
    { label: 'Angular', value: 'angular' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'HTML', value: 'html' },
    { label: 'CSS', value: 'css' },
    { label: 'Bootstrap', value: 'bootstrap' },
    { label: 'Node.js', value: 'nodejs' },
    { label: 'React', value: 'react' },
    { label: 'Vue.js', value: 'vuejs' },
    { label: 'MongoDB', value: 'mongodb' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.demoForm = this.fb.group({
      basicSelection: [[], [Validators.required]],
      selectAllSelection: [[]],
      customSelection: [[]],
      tagSelection: [[]],
      disabledSelection: this.fb.control({ value: [2, 4], disabled: true }), // Pre-selected values
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.demoForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.demoForm.valid) {
      console.log('Form Submitted:', this.demoForm.value);
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
    }
  }

  resetForm(): void {
    this.demoForm.reset();
    // Reset to empty arrays for multi-select fields
    this.demoForm.patchValue({
      basicSelection: [],
      selectAllSelection: [],
      customSelection: [],
      tagSelection: [],
      disabledSelection: [],
    });
  }

  presetValues(): void {
    this.demoForm.patchValue({
      basicSelection: [1, 3, 5],
      selectAllSelection: ['electronics', 'books'],
      customSelection: [1, 3],
      tagSelection: ['angular', 'typescript', 'javascript'],
      disabledSelection: [2, 4],
    });
  }

  getFormValues(): any {
    return this.demoForm.value;
  }

  getSelectedTags(): any[] {
    const selectedValues = this.demoForm.get('tagSelection')?.value || [];
    return this.tagItems.filter((tag) => selectedValues.includes(tag.value));
  }

  private markFormGroupTouched(): void {
    Object.keys(this.demoForm.controls).forEach((key) => {
      const control = this.demoForm.get(key);
      control?.markAsTouched();
    });
  }

  ////////////////////////////////////////////////////////////

  testControl = new FormControl<string[]>([]);

  testItems = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
    { label: 'Date', value: 'date' },
    { label: 'Elderberry', value: 'elderberry' },
    { label: 'Fig', value: 'fig' },
    { label: 'Grape', value: 'grape' },
    { label: 'Honeydew', value: 'honeydew' },
    { label: 'Iceberg', value: 'iceberg' },
    { label: 'Jackfruit', value: 'jackfruit' },
  ];

  selectAll() {
    const allValues = this.testItems.map((item) => item.value);
    this.testControl.setValue(allValues);
  }

  selectNone() {
    this.testControl.setValue([]);
  }

  selectSome() {
    this.testControl.setValue(['apple', 'cherry']);
  }
}
