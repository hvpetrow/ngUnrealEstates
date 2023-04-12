import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  @Input() commentId!: string;

  @Input() deleteModal!: boolean;
  @Output() deleteModalChange = new EventEmitter<boolean>();

  isLoading: boolean = false;

  constructor(private commentService: CommentsService, public toaster: HotToastService) { }


  outsideClickHandler(e: Event) {
    if ((e.target as HTMLTextAreaElement).tagName === 'SECTION') {
      setTimeout(() => this.closeDeleteModal(), 300)
    }
  }

  closeDeleteModal() {
    this.deleteModalChange.emit(false);
  }

  deleteCommentHandler() {
    this.isLoading = true;
    this.commentService.deleteEstateComment(this.commentId).subscribe({
      next: () => {
        this.toaster.success('Successfully deleted comment')
        this.isLoading = false;
      },
      error: (err) => console.error(err)
    });
  }
}
