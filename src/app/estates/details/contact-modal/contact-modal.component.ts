import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent {
  @Input() closeContactModal!: any;
  @Input() contactModal!: any;

  constructor() { }


  outsideClickHandler(e: Event) {
    if ((e.target as HTMLTextAreaElement).tagName === 'SECTION') {
      setTimeout(() => this.closeContactModal(), 300)
    }
  }
}
