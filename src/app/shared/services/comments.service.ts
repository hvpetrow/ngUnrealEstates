import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  commentsCollectionRef = this.db.collection('comments');

  constructor(private db: AngularFirestore) { }

  addEstate(comment: any) {
    return from(this.commentsCollectionRef.add(comment));
  }

  getEstateList() {
    return this.commentsCollectionRef.snapshotChanges();
  }
}
