import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { EstatesRoutingModule } from './estates-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EditEstateComponent } from './edit-estate/edit-estate.component';
import { CreateEstateComponent } from './create-estate/create-estate.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DetailsComponent,
    EditEstateComponent,
    CreateEstateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EstatesRoutingModule,
    ReactiveFormsModule
  ]
})
export class EstatesModule { }
