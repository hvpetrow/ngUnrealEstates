import { Component, Input, OnInit } from '@angular/core';
import { IEstate } from '../estate';

@Component({
  selector: 'app-estate-card',
  templateUrl: './estate-card.component.html',
  styleUrls: ['./estate-card.component.css']
})
export class EstateCardComponent implements OnInit {
  @Input() estate!: IEstate;

  ngOnInit(): void {
    console.log(this.estate);
  }

}
