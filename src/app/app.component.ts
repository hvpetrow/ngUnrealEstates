import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component } from '@angular/core';
import { IEstate } from './shared/estate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() { }
  title = 'ngUnrealEstates';
}
