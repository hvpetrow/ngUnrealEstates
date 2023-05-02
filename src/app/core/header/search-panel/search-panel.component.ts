import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IEstate } from 'src/app/shared/estate';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css']
})
export class SearchPanelComponent implements OnChanges {
  @Input() searchPanel!: boolean;
  @Output() searchPanelChange = new EventEmitter<boolean>();
  @Output() closePanelEvent = new EventEmitter<boolean>();

  @Input() searchedEstates!: IEstate[];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['searchPanel']);
  }

  outsideClickHandler(e: Event) {
    if ((e.target as HTMLTextAreaElement).tagName === 'SECTION') {
      this.closeSearchPanel();
      console.log("FROM panel outsideClickHandler 222222222222");

    }
  }

  closeSearchPanel() {
    console.log("FROM panel closeSearchPanel ");

    this.searchPanelChange.emit(false);
    this.closePanelEvent.emit(false);
    this.searchPanel = false;

  }
}
