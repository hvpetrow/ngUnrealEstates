import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { EstatesRoutingModule } from './estates-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EditEstateComponent } from './edit-estate/edit-estate.component';
import { CreateEstateComponent } from './create-estate/create-estate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommentFormComponent } from './comment-form/comment-form.component';



@NgModule({
  declarations: [
    DetailsComponent,
    EditEstateComponent,
    CreateEstateComponent,
    CommentFormComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    EstatesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
  ]
})
export class EstatesModule { }
