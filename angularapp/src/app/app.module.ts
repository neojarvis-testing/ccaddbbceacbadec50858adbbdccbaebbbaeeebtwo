import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddAthleteComponent } from './add-athlete/add-athlete.component';
import { AthleteListComponent } from './athlete-list/athlete-list.component';
import { EditAthleteComponent } from './edit-athlete/edit-athlete.component';

@NgModule({
  declarations: [
    AppComponent,
    AddAthleteComponent,
    AthleteListComponent,
    EditAthleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
