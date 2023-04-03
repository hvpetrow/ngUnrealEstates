import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstateCardComponent } from './estate-card/estate-card.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [EstateCardComponent, SpinnerComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    EstateCardComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
