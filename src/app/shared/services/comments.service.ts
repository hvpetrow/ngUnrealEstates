import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { query } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  commentsCollectionRef = this.db.collection('comments');


  constructor(private db: AngularFirestore) { }

  addComment(comment: any) {
    return from(this.commentsCollectionRef.add(comment));
  }

  getCommentsByEstateId(estateId: string) {
    return from(this.commentsCollectionRef.ref.where('estateId', '==', estateId).orderBy('createdAt', 'desc').get());
  }
}
