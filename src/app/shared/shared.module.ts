import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstateCardComponent } from './estate-card/estate-card.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { ShortenPipe } from './pipes/shorten.pipe';
import { SafeHmtlPipe } from './pipes/safe-hmtl.pipe';
import { DateTransformPipe } from './pipes/date-transform.pipe';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';



@NgModule({
  declarations: [EstateCardComponent, SpinnerComponent, ShortenPipe, SafeHmtlPipe, DateTransformPipe, DeleteModalComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    EstateCardComponent,
    SpinnerComponent,
    ShortenPipe,
    SafeHmtlPipe,
    DateTransformPipe,
    DeleteModalComponent
  ]
})
export class SharedModule { }
