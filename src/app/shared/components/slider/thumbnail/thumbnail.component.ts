import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent {
  @Input() index!: number;
  @Input() arr!: { imgUrl: string; }[];

  @Output() indexChange = new EventEmitter<number>();

  setImageIndexHandler(i: number) {
    this.indexChange.emit(i);
  }

}
