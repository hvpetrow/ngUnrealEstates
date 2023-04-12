import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent {
  @Input() contactModal!: boolean;
  @Output() contactModalChange = new EventEmitter<boolean>();

  constructor() { }

  outsideClickHandler(e: Event) {
    if ((e.target as HTMLTextAreaElement).tagName === 'SECTION') {
      this.contactModalChange.emit(false);
    }
  }

  closeContactModal() {
    this.contactModalChange.emit(false);
  }
}
