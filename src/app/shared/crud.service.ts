import { Injectable } from '@angular/core';
import { Estate } from './estate';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  estatesRef!: Observable<any[]>;
  estateRef!: AngularFirestoreDocument<any>;

  constructor(private db: AngularFirestore) { }

  addEstate(estate: Estate) {
    // this.estatesRef.push({
    //   firstName: estate.firstName,
    //   lastName: estate.lastName,
    //   email: estate.email,
    // });
  }

  // Fetch Single estate Object
  getEstate(id: string) {
    this.estateRef = this.db.doc('estates/' + id);
    return this.estateRef.valueChanges();
  }
  // Fetch estates List
  getEstateList() {
    // this.estatesRef = this.db.list('estates');
    // console.log(this.estatesRef.valueChanges().subscribe(data => console.log(data)
    // ));

    // return this.estatesRef;
    return this.estatesRef = this.db.collection('estates').snapshotChanges();
  }
  // Update estate Object
  updateEstate(estate: Estate) {
    this.estateRef.update({
      firstName: estate.firstName,
      lastName: estate.lastName,
      email: estate.email,
    });
  }
  // Delete estate Object
  deleteEstate(id: string) {
    // this.estateRef = this.db.object('estates/' + id);
    // this.estateRef.remove();
  }
}
