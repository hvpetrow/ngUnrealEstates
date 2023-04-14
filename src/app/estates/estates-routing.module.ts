import { RouterModule, Routes } from "@angular/router";
import { DetailsComponent } from "./details/details.component";
import { EditEstateComponent } from "./edit-estate/edit-estate.component";
import { CreateEstateComponent } from "./create-estate/create-estate.component";
import { CatalogForSellComponent } from "./catalog-for-sell/catalog-for-sell.component";
import { AuthenticationGuard } from "../core/guards/authentication.guard";
import { OwnerGuard } from "../core/guards/owner.guard";

const routes: Routes = [
    {
        path: 'create',
        canActivate: [AuthenticationGuard],
        component: CreateEstateComponent
    },
    {
        path: ':estateId/details',
        component: DetailsComponent
    },
    {
        path: ':estateId/edit',
        canActivate: [OwnerGuard],
        component: EditEstateComponent
    },
    {
        path: 'catalog-for-sell',
        component: CatalogForSellComponent
    }
];

export const EstatesRoutingModule = RouterModule.forChild(routes);