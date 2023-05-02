import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
  @Input() imgs!: String[];
  index: number = 0;

  constructor() { }


  next() {
    if (this.index === this.imgs.length - 1) {
      this.index = 0;
    } else {
      this.index = this.index + 1;
    }
  };

  prev() {
    if (this.index === 0) {
      this.index = this.imgs.length - 1;

    } else {
      this.index = this.index - 1;
    }
  };
}
