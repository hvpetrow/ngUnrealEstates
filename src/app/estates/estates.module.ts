import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { EstatesRoutingModule } from './estates-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EditEstateComponent } from './edit-estate/edit-estate.component';
import { CreateEstateComponent } from './create-estate/create-estate.component';



@NgModule({
  declarations: [
    DetailsComponent,
    EditEstateComponent,
    CreateEstateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EstatesRoutingModule
  ]
})
export class EstatesModule { }
