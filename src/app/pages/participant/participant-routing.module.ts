import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParticipantComponent } from "./participant.component";
import { ParticipantDetailComponent } from "./participant-detail/participant-detail.component";
import { ParticipantEditComponent } from "./participant-edit/participant-edit.component";

const routes: Routes = [
  {
    path: '',
    component: ParticipantComponent,
  },
  {
    path: ':id',
    component: ParticipantDetailComponent,
  },
  {
    path: ':id/edit',
    component: ParticipantEditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipantRoutingModule { }
