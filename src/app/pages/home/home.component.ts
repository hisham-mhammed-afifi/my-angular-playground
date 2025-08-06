import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  form: FormGroup;

  currentStep = 0;
  selectedColor = '#FF5733';
  selectedFont = 'Arial';

  imageUrl: string = '';
  modalRef?: BsModalRef;
  mentionText = '';

  items = [
    {
      label: 'Item 1',
      value: 1,
    },
    {
      label: 'Item 2',
      value: 2,
    },
    {
      label: 'Item 3',
      value: 3,
    },
  ];
  constructor(private fb: FormBuilder, private modalService: BsModalService) {
    this.form = this.fb.group({
      color: ['#FF5733'], // Default color
      multiSelect: [[1]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('Form value:', this.form.value);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
