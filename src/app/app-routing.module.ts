import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchBikesComponent} from "../modules/search-bikes/search-bikes.component";
import {AddBikeComponent} from "../modules/add-bike/add-bike.component";

const routes: Routes = [
  { path: 'search-bikes', component: SearchBikesComponent },
  { path: 'add-bike', component: AddBikeComponent },
  { path: '',   redirectTo: '/search-bikes', pathMatch: 'full' },
  { path: '**', redirectTo: '/search-bikes',  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
