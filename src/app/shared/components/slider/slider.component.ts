import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @Input() imgs!: { imgUrl: string; }[];
  index: number = 0;

  constructor() { }

  ngOnInit(): void {
    console.log(...this.imgs);
    const url = this.imgs
    console.log(url);

  }

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
