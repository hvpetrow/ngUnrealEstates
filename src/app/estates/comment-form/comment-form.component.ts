import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { serverTimestamp } from 'firebase/firestore';
import { CommentsService } from 'src/app/shared/services/comments.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  user$ = this.authService.currentUser$;
  userId: string | undefined;
  currentUserEmail: string | null | undefined;

  isShowedComments: boolean = false;
  comments!: any;
  commentCount: any;
  commentsArr = [];
  comments$!: Observable<any>;

  isLoading: boolean = false;

  @Input() estateId!: string;
  @Output() estateComments = new EventEmitter<any>();

  constructor(private authService: AuthenticationService, private commentsService: CommentsService, public toast: HotToastService) { }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.userId = user?.uid;
      this.currentUserEmail = user?.email;
    });

    this.getComments();
  }

  postComment(comment: any): void {
    this.isLoading = true;

    const newComment = {
      content: comment.value,
      createdAt: serverTimestamp(),
      ownerId: this.userId,
      ownerEmail: this.currentUserEmail,
      estateId: this.estateId
    }

    this.commentsService.addComment(newComment).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.toast.success('Successfully posted comment');
        console.log('Success');


      },
      error: (err) => {
        console.error(err);
        this.toast.error('Failed to post a comment');
      }
    });
  }

  showComments() {
    this.isShowedComments = !this.isShowedComments;
  }

  getComments() {
    this.isLoading = true;

    this.comments$ = this.commentsService.getCommentsByEstateId(this.estateId).pipe(
      map(changes =>
        changes.map(c => {
          const fields: any = c.payload.doc.data();
          return ({ ...fields, id: c.payload.doc.id })
        })));

    this.comments$.subscribe({
      next: (res) => {
        console.log(res);
        this.comments = res;
        this.estateComments.emit(res);

        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.toast.error('Failed to fetch the comments');
      }
    });
  }

}
