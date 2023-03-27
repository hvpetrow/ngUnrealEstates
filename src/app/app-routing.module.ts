import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllEstatesComponent } from './estates/all-estates/all-estates.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'catalog',
    component: AllEstatesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
