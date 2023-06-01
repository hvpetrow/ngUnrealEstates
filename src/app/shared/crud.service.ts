import { Injectable } from '@angular/core';
import { IEstate } from './estate';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { arrayRemove, arrayUnion, documentId } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  estatesCollectionRef = this.db.collection('estates');
  estateRef!: AngularFirestoreDocument<any>;

  constructor(private db: AngularFirestore) { }

  //Add Estate Object
  addEstate(estate: IEstate) {
    return from(this.estatesCollectionRef.add(estate));
  }

  // Fetch Single estate Object
  getEstate(id: string) {
    this.estateRef = this.db.doc('estates/' + id);
    return this.estateRef.valueChanges();
  }

  getEstatesByFavoritesId(userFavoritesId: string[] | undefined) {
    console.log(userFavoritesId);

    return this.db.collection('estates', ref => ref.where(documentId(), 'in', userFavoritesId)).snapshotChanges();
  }

  // Fetch estates List
  getEstateList() {
    return this.estatesCollectionRef.snapshotChanges();
  }

  // Update estate Object
  updateEstate(estateId: string, updatedFields: Object) {
    const docRef = this.db.doc('estates/' + estateId);
    return from(docRef.update(updatedFields));
  }

  // Delete estate Object
  deleteEstate(estateId: string) {
    const docRef = this.db.doc('estates/' + estateId);
    return from(docRef.delete());
  }


  addMyOffer(userId: string | undefined, myOfferId: string) {
    const userRef = this.db.doc('users/' + userId);
    return from(userRef.update({
      myOffers: arrayUnion(myOfferId)
    }));
  }

  removeMyOffer(userId: string | undefined, myOfferId: string) {
    const userRef = this.db.doc('users/' + userId);
    return from(userRef.update({
      myOffers: arrayRemove(myOfferId)
    }));
  }

  getMyOffersByUserId(userId: string | undefined) {
    console.log(userId);

    const ref = this.db.doc('users/' + userId);
    return ref.valueChanges();
  }

  getEstatesByMyOffersId(userMyOffersId: string[] | undefined) {
    console.log(userMyOffersId);

    return this.db.collection('estates', ref => ref.where(documentId(), 'in', userMyOffersId)).snapshotChanges();
  }

}
