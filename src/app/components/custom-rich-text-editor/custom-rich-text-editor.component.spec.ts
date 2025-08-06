import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRichTextEditorComponent } from './custom-rich-text-editor.component';

describe('CustomRichTextEditorComponent', () => {
  let component: CustomRichTextEditorComponent;
  let fixture: ComponentFixture<CustomRichTextEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomRichTextEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomRichTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
