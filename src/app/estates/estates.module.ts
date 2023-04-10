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
import { CommentsComponent } from './comments/comments.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommentsService } from '../shared/services/comments.service';
import { A11yModule } from '@angular/cdk/a11y';


@NgModule({
  declarations: [
    DetailsComponent,
    EditEstateComponent,
    CreateEstateComponent,
    CommentFormComponent,
    CommentsComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    EstatesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatSlideToggleModule,
    A11yModule
  ],
  providers: [CommentsService]
})
export class EstatesModule { }
