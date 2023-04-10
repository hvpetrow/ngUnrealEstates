import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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


  commentGroup: FormGroup = this.formBuilder.group({
    newComment: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  isOwner: boolean = false;
  isEdited: boolean = false;

  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder, private commentsService: CommentsService, public toaster: HotToastService) { }

  ngOnInit(): void {
    this.isOwner = this.comment.ownerId == this.currentUserId;

    this.commentGroup.controls['newComment'].setValue(this.comment.content);
  }

  setEditingMode() {
    this.isEdited = true;
  }

  cancelEditingMode() {
    this.isEdited = false;
  }

  editHandler() {
    if (this.commentGroup.valid) {
      this.isLoading = true;
      const { newComment } = this.commentGroup.value;
      console.log(newComment);

      const updatedComment = {
        content: newComment
      }

      this.commentsService.editEstateComment(this.comment.id, updatedComment);
    }
  }

  deleteHandler() {
    const confirmation = confirm('Are you sure you want to delete your comment?');

    if (confirmation) {
      this.isLoading = true;
      this.commentsService.deleteEstateComment(this.comment.id).subscribe({
        next: () => {
          this.toaster.success('Successfully deleted comment')
          this.isLoading = false;
        },
        error: (err) => console.error(err)
      });
    }
  }
}
