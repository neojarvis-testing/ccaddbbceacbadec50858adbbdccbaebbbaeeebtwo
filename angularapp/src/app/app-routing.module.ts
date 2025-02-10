// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AthleteListComponent } from './athlete-list/athlete-list.component';
import { AddAthleteComponent } from './add-athlete/add-athlete.component';
import { EditAthleteComponent } from './edit-athlete/edit-athlete.component';

const routes: Routes = [
  { path: '', redirectTo: '/athletes', pathMatch: 'full' },
  { path: 'athletes', component: AthleteListComponent },
  { path: 'add-athlete', component: AddAthleteComponent },
  { path: 'athletes/edit/:id', component: EditAthleteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }