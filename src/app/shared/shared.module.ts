import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstateCardComponent } from './estate-card/estate-card.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { ShortenPipe } from './pipes/shorten.pipe';
import { SafeHmtlPipe } from './pipes/safe-hmtl.pipe';
import { DateTransformPipe } from './pipes/date-transform.pipe';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { ScrollToTopBtnComponent } from './components/scroll-to-top-btn/scroll-to-top-btn.component';
import { MatIconModule } from '@angular/material/icon';
import { CarouselComponent } from './components/carousel/carousel.component';




@NgModule({
  declarations: [EstateCardComponent, SpinnerComponent, ShortenPipe, SafeHmtlPipe, DateTransformPipe, DeleteModalComponent, ScrollToTopBtnComponent, CarouselComponent],
  imports: [
    CommonModule, RouterModule, MatIconModule
  ],
  exports: [
    EstateCardComponent,
    SpinnerComponent,
    ShortenPipe,
    SafeHmtlPipe,
    DateTransformPipe,
    DeleteModalComponent,
    ScrollToTopBtnComponent
  ]
})
export class SharedModule { }
