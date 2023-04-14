import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable, map } from 'rxjs';
import { CrudService } from 'src/app/shared/crud.service';
import { IEstate } from 'src/app/shared/estate';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-catalog-for-sell',
  templateUrl: './catalog-for-sell.component.html',
  styleUrls: ['./catalog-for-sell.component.css']
})
export class CatalogForSellComponent {
  allEstatesForSell$!: Observable<IEstate[]>;

  constructor(public authService: AuthenticationService, private estateService: CrudService, public toast: HotToastService) { }

  ngOnInit(): void {
    this.getEstates();
    // this.toast.info('It Works !')
  }

  getEstates(): void {
    this.allEstatesForSell$ = this.estateService.getEstateList().pipe(
      map(changes =>
        changes.map(c => {
          const fields: any = c.payload.doc.data();
          // return Object.assign({ id: c.payload.doc.id }, c.payload.doc.data());
          return ({ ...fields, id: c.payload.doc.id })
        })));
  }
}
