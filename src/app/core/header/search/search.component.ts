import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { CrudService } from 'src/app/shared/crud.service';
import { IEstate } from 'src/app/shared/estate';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  allEstatesForSell$!: Observable<IEstate[]>;
  allEstates!: IEstate[];
  searchedEstates!: IEstate[] | undefined;
  openSearchPanel: boolean = false;
  searchTypes: string[] = ['Name', 'Location'];

  searchGroup: FormGroup = this.formBuilder.group({
    searchedEstate: new FormControl('', []),
    searchType: new FormControl('Name', [])
  });


  constructor(private formBuilder: FormBuilder, private estateService: CrudService, private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.getEstates();

    this.onSearchChanges();
  }

  onSearchChanges() {
    this.searchGroup.get('searchedEstate')?.valueChanges.subscribe(val => {
      let estateName = val;
      let searchType = this.searchGroup.controls['searchType'].value;
      this.searchedEstates = this.utilsService.filterSearchResults(this.allEstates, estateName, searchType);
      this.openSearchPanel = true;
      console.log(this.searchedEstates);
    });
  }

  changeEstateType(e: Event) {
    this.searchGroup.controls['searchType'].setValue((e.target as HTMLTextAreaElement).value, {
      onlySelf: true,
    });
  }

  getEstates(): void {
    this.allEstatesForSell$ = this.estateService.getEstateList().pipe(
      map(changes =>
        changes.map(c => {
          const fields: any = c.payload.doc.data();
          // return Object.assign({ id: c.payload.doc.id }, c.payload.doc.data());
          return ({ ...fields, id: c.payload.doc.id })
        })));

    this.allEstatesForSell$.subscribe({
      next: (res) => this.allEstates = res,
      error: (err) => console.error(err)
    });
  }
}
