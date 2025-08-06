import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export interface ToolbarButton {
  command: string;
  icon: string;
  title: string;
  requiresValue?: boolean;
}

@Component({
  selector: 'app-custom-rich-text-editor',
  templateUrl: './custom-rich-text-editor.component.html',
  styleUrls: ['./custom-rich-text-editor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomRichTextEditorComponent),
      multi: true,
    },
  ],
})
export class CustomRichTextEditorComponent implements OnInit {
  @ViewChild('editor', { static: true }) editorRef!: ElementRef<HTMLDivElement>;

  @Input() content: string = '';
  @Input() placeholder: string = 'Start typing...';
  @Input() height: string = '300px';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() showToolbar: boolean = true;
  @Input() customToolbarButtons: ToolbarButton[] = [];

  @Output() contentChange = new EventEmitter<string>();
  @Output() focus = new EventEmitter<void>();
  @Output() blur = new EventEmitter<void>();

  private onChange = (value: string) => {};
  private onTouched = () => {};
  private isUpdatingContent = false;

  toolbarButtons: ToolbarButton[] = [
    { command: 'bold', icon: 'format_bold', title: 'Bold (Ctrl+B)' },
    { command: 'italic', icon: 'format_italic', title: 'Italic (Ctrl+I)' },
    {
      command: 'underline',
      icon: 'format_underlined',
      title: 'Underline (Ctrl+U)',
    },
    {
      command: 'strikeThrough',
      icon: 'format_strikethrough',
      title: 'Strikethrough',
    },
    { command: 'separator', icon: '', title: '' },
    {
      command: 'insertUnorderedList',
      icon: 'format_list_bulleted',
      title: 'Bullet List',
    },
    {
      command: 'insertOrderedList',
      icon: 'format_list_numbered',
      title: 'Numbered List',
    },
    { command: 'separator', icon: '', title: '' },
    {
      command: 'createLink',
      icon: 'link',
      title: 'Insert Link',
      requiresValue: true,
    },
    {
      command: 'insertImage',
      icon: 'image',
      title: 'Insert Image',
      requiresValue: true,
    },
    { command: 'separator', icon: '', title: '' },
    { command: 'undo', icon: 'undo', title: 'Undo (Ctrl+Z)' },
    { command: 'redo', icon: 'redo', title: 'Redo (Ctrl+Y)' },
  ];

  ngOnInit(): void {
    if (this.customToolbarButtons.length > 0) {
      this.toolbarButtons = [
        ...this.toolbarButtons,
        ...this.customToolbarButtons,
      ];
    }
  }

  ngAfterViewInit(): void {
    this.updateEditorContent(this.content);
  }

  writeValue(value: string): void {
    this.content = value || '';
    if (this.editorRef) {
      this.updateEditorContent(this.content);
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (this.editorRef) {
      this.editorRef.nativeElement.contentEditable = (
        !isDisabled && !this.readonly
      ).toString();
    }
  }

  private updateEditorContent(content: string): void {
    if (this.isUpdatingContent) return;

    this.isUpdatingContent = true;
    const editor = this.editorRef.nativeElement;
    const selection = window.getSelection();
    const range =
      selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

    let cursorPosition = 0;
    let cursorNode: Node | null = null;

    if (range && editor.contains(range.startContainer)) {
      cursorPosition = range.startOffset;
      cursorNode = range.startContainer;
    }

    if (editor.innerHTML !== content) {
      editor.innerHTML = content;

      if (cursorNode && editor.contains(cursorNode)) {
        try {
          const newRange = document.createRange();
          newRange.setStart(
            cursorNode,
            Math.min(cursorPosition, cursorNode.textContent?.length || 0)
          );
          newRange.collapse(true);
          selection?.removeAllRanges();
          selection?.addRange(newRange);
        } catch (e) {
          this.setCursorAtEnd();
        }
      }
    }

    this.isUpdatingContent = false;
  }

  private setCursorAtEnd(): void {
    const editor = this.editorRef.nativeElement;
    const range = document.createRange();
    const selection = window.getSelection();

    if (editor.lastChild) {
      range.selectNodeContents(editor.lastChild);
      range.collapse(false);
    } else {
      range.selectNodeContents(editor);
      range.collapse(false);
    }

    selection?.removeAllRanges();
    selection?.addRange(range);
  }

  onEditorInput(): void {
    if (this.isUpdatingContent) return;

    const content = this.editorRef.nativeElement.innerHTML;
    this.content = content;
    this.onChange(content);
    this.contentChange.emit(content);
  }

  onEditorFocus(): void {
    this.focus.emit();
  }

  onEditorBlur(): void {
    this.onTouched();
    this.blur.emit();
  }

  onEditorKeyDown(event: KeyboardEvent): void {
    if (event.ctrlKey || event.metaKey) {
      switch (event.key.toLowerCase()) {
        case 'b':
          event.preventDefault();
          this.executeCommand('bold');
          break;
        case 'i':
          event.preventDefault();
          this.executeCommand('italic');
          break;
        case 'u':
          event.preventDefault();
          this.executeCommand('underline');
          break;
        case 'z':
          event.preventDefault();
          this.executeCommand('undo');
          break;
        case 'y':
          event.preventDefault();
          this.executeCommand('redo');
          break;
      }
    }
  }

  executeCommand(command: string): void {
    if (this.disabled || this.readonly) return;

    this.editorRef.nativeElement.focus();

    switch (command) {
      case 'createLink':
        this.insertLink();
        break;
      case 'insertImage':
        this.insertImage();
        break;
      default:
        document.execCommand(command, false);
        break;
    }

    this.onEditorInput();
  }

  private insertLink(): void {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const selectedText = selection.toString();
    const url = prompt('Enter URL:', 'https://');

    if (url && url.trim()) {
      if (selectedText) {
        document.execCommand('createLink', false, url);
      } else {
        const linkText = prompt('Enter link text:', url);
        if (linkText) {
          document.execCommand(
            'insertHTML',
            false,
            `<a href="${url}" target="_blank">${linkText}</a>`
          );
        }
      }
    }
  }

  private insertImage(): void {
    const url = prompt('Enter image URL:', 'https://');
    if (url && url.trim()) {
      const alt = prompt('Enter alt text (optional):', '');
      document.execCommand(
        'insertHTML',
        false,
        `<img src="${url}" alt="${
          alt || ''
        }" style="max-width: 100%; height: auto;">`
      );
    }
  }

  isCommandActive(command: string): boolean {
    if (this.disabled || this.readonly) return false;

    try {
      return document.queryCommandState(command);
    } catch (e) {
      return false;
    }
  }

  getContent(): string {
    return this.content;
  }

  setContent(content: string): void {
    this.writeValue(content);
    this.onChange(content);
    this.contentChange.emit(content);
  }

  clearContent(): void {
    this.setContent('');
  }

  insertAtCursor(html: string): void {
    if (this.disabled || this.readonly) return;

    this.editorRef.nativeElement.focus();
    document.execCommand('insertHTML', false, html);
    this.onEditorInput();
  }
}
