import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { NoOrganisationComponent } from "./pages/no-organisation/no-organisation.component";
import { AuthGuard } from "./guards/auth.guard";
import { OrganisationsGuard } from "./guards/organisations.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [AuthGuard, OrganisationsGuard],
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'no-organisation',
    canActivate: [AuthGuard],
    component: NoOrganisationComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
