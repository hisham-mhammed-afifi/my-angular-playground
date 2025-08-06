import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rich-text-editor-usage',
  templateUrl: './rich-text-editor-usage.component.html',
  styleUrls: ['./rich-text-editor-usage.component.css'],
})
export class RichTextEditorUsageComponent {
  // Basic usage
  basicContent = '<p>Hello <strong>World</strong>!</p>';

  // Reactive forms
  myForm = new FormGroup({
    description: new FormControl('', [Validators.required]),
  });

  // Custom configuration
  customContent = '';
  isDisabled = false;
  isReadonly = false;
  showToolbar = true;
  customButtons = [
    { command: 'insertHorizontalRule', icon: '—', title: 'Insert Line' },
    { command: 'removeFormat', icon: '⌫', title: 'Clear Formatting' },
  ];

  // Programmatic control
  programmaticContent = '';

  // Template-driven form
  templateContent = '';

  onContentChange(content: string) {
    console.log('Content changed:', content);
  }

  onCustomContentChange(content: string) {
    console.log('Custom content changed:', content);
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log('Reactive form submitted:', this.myForm.value);
      alert('Form submitted successfully!');
    } else {
      console.log('Form is invalid');
      // Mark all fields as touched to show validation errors
      this.myForm.markAllAsTouched();
    }
  }

  onTemplateSubmit(form: any) {
    if (form.valid) {
      console.log('Template form submitted:', form.value);
      alert('Template form submitted successfully!');
    } else {
      console.log('Template form is invalid');
    }
  }

  onFocus() {
    console.log('Editor focused');
  }

  onBlur() {
    console.log('Editor blurred');
  }

  insertText() {
    this.programmaticContent +=
      '<p>Inserted text at ' + new Date().toLocaleTimeString() + '</p>';
  }

  clearEditor() {
    this.programmaticContent = '';
  }

  getContent() {
    console.log('Current content:', this.programmaticContent);
    alert(
      'Content logged to console. Length: ' +
        this.programmaticContent.length +
        ' characters'
    );
  }
}
