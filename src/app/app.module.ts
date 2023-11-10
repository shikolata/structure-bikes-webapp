import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBikesComponent } from '../modules/search-bikes/search-bikes.component';
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSortModule} from "@angular/material/sort";
import { StoreModule } from '@ngrx/store';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {bikesReducer} from "../store/structure-bikes.reducer";
import {EffectsModule} from "@ngrx/effects";
import {StructureBikesEffects} from "../store/structure-bikes.effects";
import {HttpClientModule} from "@angular/common/http";
import { AddBikeComponent } from '../modules/add-bike/add-bike.component';
import { BikeFormComponent } from '../shared/components/bike-form/bike-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { ViewBikeComponent } from '../modules/view-bike/view-bike.component';
import { EditBikeComponent } from '../modules/edit-bike/edit-bike.component';
import { NavigationComponent } from '../shared/components/navigation/navigation.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    AppComponent,
    SearchBikesComponent,
    AddBikeComponent,
    BikeFormComponent,
    ViewBikeComponent,
    EditBikeComponent,
    NavigationComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    StoreModule.forRoot({bikes: bikesReducer}, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      // logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([StructureBikesEffects]),
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
