import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from } from 'rxjs';
import { IEstate } from '../estate';
import { arrayRemove, arrayUnion } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  usersCollectionRef = this.db.collection('users');

  constructor(private db: AngularFirestore) { }

  initializeUserWithFavorites(userId: string) {
    return from(this.usersCollectionRef.doc(userId).set({ favorites: [] }));
  }

  addFavorite(userId: string | undefined, favoriteId: string) {
    const userRef = this.db.doc('users/' + userId);
    return from(userRef.update({
      favorites: arrayUnion(favoriteId)
    }));
  }

  getFavoritesByUserId(userId: string | undefined) {
    console.log(userId);

    const ref = this.db.doc('users/' + userId);
    return ref.valueChanges();
  }

  removeFavorite(userId: string | undefined, favoriteId: string) {
    const userRef = this.db.doc('users/' + userId);
    return from(userRef.update({
      favorites: arrayRemove(favoriteId)
    }));
  }
}
