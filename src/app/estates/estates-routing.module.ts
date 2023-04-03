import { RouterModule, Routes } from "@angular/router";
import { DetailsComponent } from "./details/details.component";

const routes: Routes = [
    {
        path: ':estateId/details',
        component: DetailsComponent
    }
];

export const EstatesRoutingModule = RouterModule.forChild(routes);