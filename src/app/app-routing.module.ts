import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchBikesComponent} from "../modules/search-bikes/search-bikes.component";
import {AddBikeComponent} from "../modules/add-bike/add-bike.component";
import {ViewBikeComponent} from "../modules/view-bike/view-bike.component";
import {EditBikeComponent} from "../modules/edit-bike/edit-bike.component";
import {EditGalleryComponent} from "../modules/edit-gallery/edit-gallery.component";

const routes: Routes = [
  { path: 'search-bikes', component: SearchBikesComponent },
  { path: 'add-bike', component: AddBikeComponent },
  { path: 'view-bike', component: ViewBikeComponent },
  { path: 'edit-bike', component: EditBikeComponent },
  { path: 'edit-gallery', component: EditGalleryComponent },
  { path: '',   redirectTo: '/search-bikes', pathMatch: 'full' },
  { path: '**', redirectTo: '/search-bikes',  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
