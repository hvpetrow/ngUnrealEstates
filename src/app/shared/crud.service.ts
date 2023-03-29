import { Injectable } from '@angular/core';
import { IEstate } from './estate';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  estatesCollectionRef = this.db.collection('estates');
  estatesRef!: Observable<any[]>;
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
}
