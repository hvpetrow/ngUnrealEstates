import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { HotToastService } from '@ngneat/hot-toast';
import { CrudService } from '../../crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  @Input() commentId!: string;
  @Input() estateId!: string;
  @Input() estateComments!: any;

  @Input() deleteModal!: boolean;
  @Output() deleteModalChange = new EventEmitter<boolean>();

  color = 'red';

  isLoading: boolean = false;

  constructor(private commentService: CommentsService, private estateService: CrudService, private router: Router, public toaster: HotToastService) { }

  outsideClickHandler(e: Event) {
    if ((e.target as HTMLTextAreaElement).tagName === 'SECTION') {
      setTimeout(() => this.closeDeleteModal(), 300)
    }
  }

  closeDeleteModal() {
    this.deleteModalChange.emit(false);
  }

  deleteHandler() { //delete the offer with its comments
    this.isLoading = true;
    if (!this.commentId && this.estateId) {
      this.estateService.deleteEstate(this.estateId).subscribe({ //delete estate
        error: (err) => console.error(err),
        complete: () => {
          this.router.navigate(['/home']);
          this.toaster.success('Successfully deleted estate!');
        }
      });

      this.estateComments.forEach((c: any) => {
        const { id } = c;
        this.commentService.deleteEstateComment(id).subscribe({ //delete current comment
          next: () => {
            this.isLoading = false;
          },
          error: (err) => console.error(err)
        });
      });
    } else {
      this.commentService.deleteEstateComment(this.commentId).subscribe({ //delete current comment
        next: () => {
          this.toaster.success('Successfully deleted comment')
          this.isLoading = false;
        },
        error: (err) => console.error(err)
      });
    }
  }
}
