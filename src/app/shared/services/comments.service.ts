import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
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

  editEstateComment(commentId: string, updatedComment: Object) {
    const docRef = this.db.doc('comments/' + commentId);
    return from(docRef.update(updatedComment));
  }

  deleteEstateComment(commentId: string) {
    const docRef = this.db.doc('comments/' + commentId);
    return from(docRef.delete());
  }
}
