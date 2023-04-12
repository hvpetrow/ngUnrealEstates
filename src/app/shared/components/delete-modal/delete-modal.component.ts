import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  @Input() closeDeleteModal!: any;
  @Input() deleteModal!: any;
  @Input() deleteCommentHandler!: any;

  constructor() { }


  outsideClickHandler(e: Event) {
    if ((e.target as HTMLTextAreaElement).tagName === 'SECTION') {
      setTimeout(() => this.closeDeleteModal(), 300)
    }
  }


}
