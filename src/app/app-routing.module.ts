import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchBikesComponent} from "../modules/search-bikes/search-bikes.component";

const routes: Routes = [
  { path: 'search-bikes', component: SearchBikesComponent },
  { path: '',   redirectTo: '/search-bikes', pathMatch: 'full' },
  { path: '**', redirectTo: '/search-bikes',  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
