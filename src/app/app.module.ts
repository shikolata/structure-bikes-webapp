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
import { GalleryComponent } from '../shared/components/gallery/gallery.component';
import { EditGalleryComponent } from '../modules/edit-gallery/edit-gallery.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LanguageSelectorComponent} from '../shared/components/language-selector/language-selector.component';
import {MatSelectModule} from "@angular/material/select";
import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {NgxMaskModule} from "ngx-mask";
import { CarouselComponent } from '../shared/components/carousel/carousel.component';
import {SlickCarouselModule} from "ngx-slick-carousel";
import { WeatherWidgetComponent } from '../shared/components/weather-widget/weather-widget.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    SearchBikesComponent,
    AddBikeComponent,
    BikeFormComponent,
    ViewBikeComponent,
    EditBikeComponent,
    NavigationComponent,
    GalleryComponent,
    EditGalleryComponent,
    LanguageSelectorComponent,
    ConfirmDialogComponent,
    CarouselComponent,
    WeatherWidgetComponent
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
    MatMenuModule,
    MatDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatSelectModule,
    NgxMaskModule.forRoot(),
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
