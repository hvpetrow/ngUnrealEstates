import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstateCardComponent } from './estate-card/estate-card.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { ShortenPipe } from './pipes/shorten.pipe';
import { SafeHmtlPipe } from './pipes/safe-hmtl.pipe';



@NgModule({
  declarations: [EstateCardComponent, SpinnerComponent, ShortenPipe, SafeHmtlPipe],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    EstateCardComponent,
    SpinnerComponent,
    ShortenPipe,
    SafeHmtlPipe
  ]
})
export class SharedModule { }
