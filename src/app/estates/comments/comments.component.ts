import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  @Input() commentId: any;
  @Input() comments: any;
  @Input() user: any;

  isOwner: boolean = false;

  deleteHandler() {

  }
}
