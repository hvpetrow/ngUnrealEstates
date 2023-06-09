import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { CrudService } from '../shared/crud.service';
import { Observable, map } from 'rxjs';
import { IEstate } from '../shared/estate';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  latestEstates$!: Observable<IEstate[]>;

  constructor(public authService: AuthenticationService, private estateService: CrudService, public toast: HotToastService) { }

  ngOnInit(): void {
    this.getEstates();
    // this.toast.info('It Works !')
  }

  getEstates(): void {
    this.latestEstates$ = this.estateService.getEstateList().pipe(
      map(changes =>
        changes.map(c => {
          const fields: any = c.payload.doc.data();
          // return Object.assign({ id: c.payload.doc.id }, c.payload.doc.data());
          return ({ ...fields, id: c.payload.doc.id })
        })));
  }
}
