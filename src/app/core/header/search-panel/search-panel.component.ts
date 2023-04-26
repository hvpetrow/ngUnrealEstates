import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEstate } from 'src/app/shared/estate';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css']
})
export class SearchPanelComponent {
  @Input() searchPanel!: boolean;
  @Output() searchPanelChange = new EventEmitter<boolean>();

  @Input() searchedEstates!: IEstate[];

  constructor() { }

  outsideClickHandler(e: Event) {
    if ((e.target as HTMLTextAreaElement).tagName === 'SECTION') {
      setTimeout(() => this.closeSearchPanel(), 300);
    }
  }

  closeSearchPanel() {
    this.searchPanelChange.emit(false);
  }
}
