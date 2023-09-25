import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from "../containers";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NoOrganisationComponent } from "./no-organisation/no-organisation.component";
import { AdminGuard } from "../guards/admin.guard";

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'organisation',
        loadChildren: () => import('./organisation/organisation.module').then((m) => m.OrganisationModule)
      },
      {
        path: 'participant',
        loadChildren: () => import('./participant/participant.module').then((m) => m.ParticipantModule)
      },
      {
        path: 'application',
        loadChildren: () => import('./application/application.module').then((m) => m.ApplicationModule)
      },
      {
        path: 'activity',
        loadChildren: () => import('./activity/activity.module').then((m) => m.ActivityModule)
      },
      {
        path: 'admin',
        canActivate: [AdminGuard],
        loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
