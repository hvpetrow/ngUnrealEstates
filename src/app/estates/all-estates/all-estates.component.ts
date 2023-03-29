import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CrudService } from 'src/app/shared/crud.service';
import { IEstate } from 'src/app/shared/estate';

@Component({
  selector: 'app-all-estates',
  templateUrl: './all-estates.component.html',
  styleUrls: ['./all-estates.component.css']
})

export class AllEstatesComponent implements OnInit {
  estates$ = this.estateService.getEstateList();
  estates!: any;
  oneEstate$!: Observable<any>;

  constructor(private estateService: CrudService) { }

  ngOnInit(): void {
    this.getEstates();
    // this.oneEstate$ = this.estateService.getEstate('NX36G4DosTXWStP9QB9c');
    this.estates$.subscribe(data => console.log(data));
    // this.update();
    // this.delete();
    // this.create();
  }

  create(): void {
    const estate = {
      firstName: 'Pesho2',
      lastName: 'Peshev',
      email: 'pesho@abv.123'
    }

    // this.estateService.addEstate(estate);
  }

  update(): any {
    const updatedEstate = this.estateService.updateEstate('NX36G4DosTXWStP9QB9c', { firstName: 'Pesho' });
  }

  delete(): any {
    this.estateService.deleteEstate('NX36G4DosTXWStP9QB9c');
  }


  getEstates(): void {
    this.estateService.getEstateList().pipe(
      map(changes =>
        changes.map(c => {
          const fields: any = c.payload.doc.data();
          // return Object.assign({ id: c.payload.doc.id }, c.payload.doc.data());
          return ({ ...fields, id: c.payload.doc.id })
        }
        )
      )
    ).subscribe(data => {
      this.estates = data;
      console.log(this.estates);

    });
  }
}
