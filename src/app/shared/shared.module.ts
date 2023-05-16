import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstateCardComponent } from './estate-card/estate-card.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { ShortenPipe } from './pipes/shorten.pipe';
import { DateTransformPipe } from './pipes/date-transform.pipe';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { ScrollToTopBtnComponent } from './components/scroll-to-top-btn/scroll-to-top-btn.component';
import { MatIconModule } from '@angular/material/icon';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HighlightDirective } from './directives/highlight.directive';
import { UnlessDirective } from './directives/unless.directive';
import { SliderComponent } from './components/slider/slider.component';
import { ThumbnailComponent } from './components/slider/thumbnail/thumbnail.component';
import { LocalizedNumericInputDirective } from './directives/localized-numeric-input.directive';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { EnergyPassComponent } from './components/energy-pass/energy-pass.component';




@NgModule({
  declarations: [EstateCardComponent, SpinnerComponent, ShortenPipe, DateTransformPipe, DeleteModalComponent,
    ScrollToTopBtnComponent, CarouselComponent, HighlightDirective,
    UnlessDirective, SliderComponent, ThumbnailComponent, LocalizedNumericInputDirective, GoogleMapsComponent, EnergyPassComponent],
  imports: [
    CommonModule, RouterModule, MatIconModule
  ],
  exports: [
    EstateCardComponent,
    SpinnerComponent,
    ShortenPipe,
    DateTransformPipe,
    DeleteModalComponent,
    ScrollToTopBtnComponent,
    SliderComponent,
    ThumbnailComponent,
    EnergyPassComponent
  ]
})
export class SharedModule { }
