import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganisationComponent } from "./organisation.component";
import { OrganisationDetailComponent } from "./organisation-detail/organisation-detail.component";

const routes: Routes = [
  {
    path: '',
    component: OrganisationComponent,
  },
  {
    path: ':id',
    component: OrganisationDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganisationRoutingModule { }
