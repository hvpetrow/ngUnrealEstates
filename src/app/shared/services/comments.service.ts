import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { arrayRemove, arrayUnion } from '@angular/fire/firestore';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  commentsCollectionRef = this.db.collection('comments');
  estateRef!: AngularFirestoreDocument<any>;

  constructor(private db: AngularFirestore) { }

  addComment(comment: any) {
    return from(this.commentsCollectionRef.add(comment));
  }

  getCommentsByEstateId(estateId: string) {
    return this.db.collection('comments', ref => ref.where('estateId', '==', estateId).orderBy('createdAt')).snapshotChanges();
  }

  getComment(id: string) {
    const ref = this.db.doc('comments/' + id);
    return ref.valueChanges();
  }

  editEstateComment(commentId: string, updatedComment: Object) {
    const docRef = this.db.doc('comments/' + commentId);
    return from(docRef.update(updatedComment));
  }

  deleteEstateComment(commentId: string) {
    const docRef = this.db.doc('comments/' + commentId);
    return from(docRef.delete());
  }

  sendReaction(reaction: string, commentId: string, userId: string) {
    const commentRef = this.db.doc('comments/' + commentId);

    if (reaction === 'like') {
      return from(commentRef.update({
        likes: arrayUnion(userId)
      }));
    } else {
      return from(commentRef.update({
        dislikes: arrayUnion(userId)
      }));
    }
  }

  removeReaction(reaction: string, commentId: string, userId: string) {
    const commentRef = this.db.doc('comments/' + commentId);

    if (reaction === 'like') {
      return from(commentRef.update({
        likes: arrayRemove(userId)
      }));
    } else {
      return from(commentRef.update({
        dislikes: arrayRemove(userId)
      }));
    }
  }
}
