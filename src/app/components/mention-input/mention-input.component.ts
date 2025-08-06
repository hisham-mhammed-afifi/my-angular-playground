import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

interface User {
  id: string;
  name: string;
}

@Component({
  selector: 'app-mention-input',
  templateUrl: './mention-input.component.html',
  styleUrls: ['./mention-input.component.css'],
})
export class MentionInputComponent implements OnInit {
  @ViewChild('editor', { static: true }) editorElement!: ElementRef;
  @Input() users: User[] = [];
  @Output() contentChange = new EventEmitter<string>();

  showSuggestions = false;
  filteredUsers: User[] = [];
  activeIndex = 0;
  mentionStartNode: Node | null = null;
  mentionStartOffset: number | null = null;
  currentQuery = '';
  suggestionPosition = { top: 0, left: 0 };

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    // Initialize with example users if none provided
    if (this.users.length === 0) {
      this.users = [
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' },
        { id: '3', name: 'Charlie' },
        { id: '4', name: 'Diana' },
        { id: '5', name: 'Edward' },
      ];
    }
  }

  onInput(): void {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    // Check if we're in a mention context
    if (this.checkForMentionTrigger(range)) {
      // Filter users based on query
      this.filterUsers();

      // Position the dropdown
      this.positionSuggestionDropdown(range);

      // Show suggestions
      this.showSuggestions = true;
      this.activeIndex = 0;
    } else {
      this.closeSuggestions();
    }

    this.contentChange.emit(this.editorElement.nativeElement.innerHTML);
  }

  checkForMentionTrigger(range: Range): boolean {
    const currentNode = range.startContainer;
    const startOffset = range.startOffset;

    if (currentNode.nodeType !== Node.TEXT_NODE) return false;

    const textContent = currentNode.textContent || '';

    // Look backwards from cursor position to find @
    for (let i = startOffset - 1; i >= 0; i--) {
      // Found a potential @ symbol
      if (textContent[i] === '@') {
        // Check if @ is at start of input or preceded by whitespace
        if (i === 0 || /\s/.test(textContent[i - 1])) {
          this.mentionStartNode = currentNode;
          this.mentionStartOffset = i;
          this.currentQuery = textContent.substring(i + 1, startOffset);
          return true;
        }
      }

      // If we hit whitespace before finding @, there's no mention trigger
      if (/\s/.test(textContent[i]) && textContent[i] !== '@') {
        return false;
      }
    }

    // Check in previous nodes (for multi-node content)
    const treeWalker = document.createTreeWalker(
      this.editorElement.nativeElement,
      NodeFilter.SHOW_TEXT,
      null
    );

    let node = treeWalker.currentNode;
    while (node) {
      if (node === currentNode) {
        break;
      }
      node = treeWalker.nextNode() as Node;
    }

    // We can now walk backwards to check previous text nodes
    const previousNode = treeWalker.previousNode() as Node;
    if (previousNode && previousNode.nodeType === Node.TEXT_NODE) {
      const prevText = previousNode.textContent || '';
      const lastChar = prevText.charAt(prevText.length - 1);

      if (lastChar === '@') {
        this.mentionStartNode = previousNode;
        this.mentionStartOffset = prevText.length - 1;
        this.currentQuery =
          startOffset > 0 ? textContent.substring(0, startOffset) : '';
        return true;
      }
    }

    return false;
  }

  filterUsers(): void {
    if (!this.currentQuery) {
      this.filteredUsers = [...this.users];
      return;
    }

    const query = this.currentQuery.toLowerCase();
    this.filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(query)
    );
  }

  positionSuggestionDropdown(range: Range): void {
    const rect = range.getBoundingClientRect();
    const editorRect = this.editorElement.nativeElement.getBoundingClientRect();

    this.suggestionPosition = {
      top:
        rect.bottom -
        editorRect.top +
        this.editorElement.nativeElement.scrollTop,
      left: rect.left - editorRect.left,
    };
  }

  selectUser(user: User): void {
    if (!this.mentionStartNode || this.mentionStartOffset === null) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    // Create a mention span element
    const mentionNode = document.createElement('span');
    mentionNode.className = 'mention';
    mentionNode.contentEditable = 'false';
    mentionNode.textContent = `@${user.name}`;
    mentionNode.setAttribute('data-user-id', user.id);

    // Create a range from the @ to the current cursor position
    const mentionRange = document.createRange();
    mentionRange.setStart(this.mentionStartNode, this.mentionStartOffset);
    mentionRange.setEnd(range.endContainer, range.endOffset);

    // Delete the text and insert the mention
    mentionRange.deleteContents();
    mentionRange.insertNode(mentionNode);

    // Add a space after the mention and position cursor
    const spaceNode = document.createTextNode('\u00A0');
    if (mentionNode.nextSibling) {
      mentionNode.parentNode?.insertBefore(spaceNode, mentionNode.nextSibling);
    } else {
      mentionNode.parentNode?.appendChild(spaceNode);
    }

    // Move cursor after the mention and space
    const newRange = document.createRange();
    newRange.setStartAfter(spaceNode);
    newRange.collapse(true);

    selection.removeAllRanges();
    selection.addRange(newRange);

    // Close suggestions and notify content change
    this.closeSuggestions();
    this.contentChange.emit(this.editorElement.nativeElement.innerHTML);

    // Focus back on editor
    this.editorElement.nativeElement.focus();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (!this.showSuggestions) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeIndex = Math.min(
          this.activeIndex + 1,
          this.filteredUsers.length - 1
        );
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex = Math.max(this.activeIndex - 1, 0);
        break;

      case 'Enter':
        if (this.filteredUsers.length > 0) {
          event.preventDefault();
          this.selectUser(this.filteredUsers[this.activeIndex]);
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.closeSuggestions();
        break;

      case 'Tab':
        if (this.filteredUsers.length > 0) {
          event.preventDefault();
          this.selectUser(this.filteredUsers[this.activeIndex]);
        }
        break;
    }
  }

  closeSuggestions(): void {
    this.showSuggestions = false;
    this.mentionStartNode = null;
    this.mentionStartOffset = null;
    this.currentQuery = '';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Close suggestions when clicking outside
    if (!this.el.nativeElement.contains(event.target)) {
      this.closeSuggestions();
    }
  }
}
