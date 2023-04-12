import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { CommentsService } from 'src/app/shared/services/comments.service';
import { UtilsService } from 'src/app/shared/services/utils.service';


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
  timeAgo!: any;
  hasLiked!: boolean;
  hasDisliked!: boolean;
  deleteModal: boolean = false;

  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder, private commentsService: CommentsService, public toaster: HotToastService, private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.isOwner = this.comment.ownerId == this.currentUserId;

    this.commentGroup.controls['newComment'].setValue(this.comment.content);

    this.timeAgo = this.utilsService.timeAgoHandler(this.comment.createdAt.toDate());
    console.log(this.timeAgo);


    this.hasLiked = this.comment.likes?.includes(this.currentUserId);
    console.log(this.hasLiked);

    this.hasDisliked = this.comment.dislikes?.includes(this.currentUserId);
    console.log(this.hasDisliked);

  }

  openDeleteModal() {
    this.deleteModal = true;
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

  sendReaction(reaction: string) {
    console.log('has liked', this.hasLiked);
    console.log('has disliked', this.hasDisliked);

    this.commentsService.sendReaction(reaction, this.comment.id, this.currentUserId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  removeReaction(reaction: string) {
    this.commentsService.removeReaction(reaction, this.comment.id, this.currentUserId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
}