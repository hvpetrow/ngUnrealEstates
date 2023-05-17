import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from } from 'rxjs';
import { IEstate } from '../estate';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  favoritesCollectionRef = this.db.collection('favorites');

  constructor(private db: AngularFirestore) { }

  addFavorite(favorite: IEstate) {
    return from(this.favoritesCollectionRef.add(favorite));
  }

  deleteFavorite(favoriteId: string) {
    const docRef = this.db.doc('favorites/' + favoriteId);
    return from(docRef.delete());
  }
}
