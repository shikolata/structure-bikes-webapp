import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpLoaderFactory } from 'src/main';
import { StructureBikesEffects } from 'src/store/structure-bikes.effects';
import { bikesReducer } from 'src/store/structure-bikes.reducer';
import { routes } from './app-routing.module';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      MatTableModule,
      MatFormFieldModule,
      MatInputModule,
      MatPaginatorModule,
      MatSortModule,
      StoreModule.forRoot({ bikes: bikesReducer }, {}),
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
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(routes, withComponentInputBinding()),
  ]
};
