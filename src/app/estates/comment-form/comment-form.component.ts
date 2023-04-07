import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { arrayRemove, arrayUnion, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';

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

  @Input() estateId!: string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.userId = user?.uid;
      this.currentUserEmail = user?.email;
    });

  }
  postComment(comment: any): void {
    const newComment = {
      content: comment.value,
      createdAt: serverTimestamp(),
      ownerId: this.userId,
      ownerEmail: this.currentUserEmail,
      topicId: this.estateId
    }
  }
}
