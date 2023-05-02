import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { IEstate } from 'src/app/shared/estate';

@Component({
  selector: 'app-searched-estate-template',
  templateUrl: './searched-estate-template.component.html',
  styleUrls: ['./searched-estate-template.component.css']
})
export class SearchedEstateTemplateComponent {

  @Input() searchedEstate!: IEstate;
  @Input() searchPanel!: boolean;
  @Output() searchPanelChange = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['searchPanel']);

  }

  closeSearchPanel() {
    this.searchPanelChange.emit(false);
    this.searchPanel = false;
    console.log("Emiting false from template");

  }
}
