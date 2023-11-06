import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from "./activity.component";
import { ActivityDetailComponent } from "./activity-detail/activity-detail.component";
import { ActivityCompareComponent } from "./activity-compare/activity-compare.component";

const routes: Routes = [
  {
    path: '',
    component: ActivityComponent
  },
  {
    path: 'compare',
    component: ActivityCompareComponent
  },
  {
    path: ':activityId',
    component: ActivityDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
