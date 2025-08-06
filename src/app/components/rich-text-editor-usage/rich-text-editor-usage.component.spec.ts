import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichTextEditorUsageComponent } from './rich-text-editor-usage.component';

describe('RichTextEditorUsageComponent', () => {
  let component: RichTextEditorUsageComponent;
  let fixture: ComponentFixture<RichTextEditorUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RichTextEditorUsageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RichTextEditorUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
