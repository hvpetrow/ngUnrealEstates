import { Component, Input, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { CommentsService } from 'src/app/shared/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() comment: any;
  @Input() currentUserId: any;

  isOwner: boolean = false;

  constructor(private commentsService: CommentsService, public toaster: HotToastService) { }

  ngOnInit(): void {
    this.isOwner = this.comment.ownerId == this.currentUserId;
  }

  deleteHandler() {
    const confirmation = confirm('Are you sure you want to delete your comment?');

    if (confirmation) {
      this.commentsService.deleteEstateComment(this.comment.id).subscribe({
        next: () => this.toaster.success('Successfully deleted comment'),
        error: (err) => console.error(err)
      });
    }
  }
}
