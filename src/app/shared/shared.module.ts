import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstateCardComponent } from './estate-card/estate-card.component';



@NgModule({
  declarations: [EstateCardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    EstateCardComponent
  ]
})
export class SharedModule { }
