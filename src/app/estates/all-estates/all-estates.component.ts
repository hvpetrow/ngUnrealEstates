import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CrudService } from 'src/app/shared/crud.service';
import { Estate } from 'src/app/shared/estate';

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
    this.oneEstate$ = this.estateService.getEstate('NX36G4DosTXWStP9QB9c');
    this.oneEstate$.subscribe(data => console.log(data));
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
