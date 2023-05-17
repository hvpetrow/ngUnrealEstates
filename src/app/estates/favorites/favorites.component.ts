import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable, map } from 'rxjs';
import { CrudService } from 'src/app/shared/crud.service';
import { IEstate } from 'src/app/shared/estate';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  favorites$!: Observable<IEstate[]>;

  constructor(public authService: AuthenticationService, private estateService: CrudService, public toast: HotToastService) { }

  ngOnInit(): void {
    this.getEstates();
  }

  getEstates(): void {
    this.favorites$ = this.estateService.getEstateList().pipe(
      map(changes =>
        changes.map(c => {
          const fields: any = c.payload.doc.data();
          // return Object.assign({ id: c.payload.doc.id }, c.payload.doc.data());
          return ({ ...fields, id: c.payload.doc.id })
        })));
  }
}
