import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstateCardComponent } from './estate-card/estate-card.component';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
  declarations: [EstateCardComponent, SpinnerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    EstateCardComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
