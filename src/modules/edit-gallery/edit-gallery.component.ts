import { Component, Input, OnInit, Signal, inject } from '@angular/core';
import {Page} from "../../shared/constants";
import {Router} from "@angular/router";
import {HttpEventType} from "@angular/common/http";
import {Bike} from "../../shared/models/bike";
import {ImageService} from "../../shared/services/image.service";
import { MatButtonModule } from '@angular/material/button';
import { NgStyle } from '@angular/common';
import { GalleryComponent } from '../../shared/components/gallery/gallery.component';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { SignalStoreProps } from '@ngrx/signals/src/signal-store-models';
import { StructureBikesStore } from 'src/store/sturucture-bikes.store';

@Component({
    selector: 'app-edit-gallery',
    templateUrl: './edit-gallery.component.html',
    styleUrls: ['./edit-gallery.component.scss'],
    standalone: true,
    imports: [NavigationComponent, GalleryComponent, MatButtonModule, NgStyle]
})
export class EditGalleryComponent implements OnInit {
  private structureBikesStore: SignalStoreProps<any> = inject(StructureBikesStore);  
  private router: Router = inject(Router);
  private imageService: ImageService = inject(ImageService);
  
  @Input('id') bikeId: string;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';

  currentPage: Signal<Page> = this.structureBikesStore.currentPage;
  page = Page;

  ngOnInit(): void {
    this.structureBikesStore.setCurrentPage(Page.EDIT_GALLERY);
    this.structureBikesStore.updateSelectedBike(+this.bikeId);
  }

  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.preview = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.imageService.addImage(this.bikeId, this.currentFile).subscribe({
          next: (event: any) => {
            if (event?.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else {
              const selectedBike = event as Bike;
              this.structureBikesStore.setSelectedBike(selectedBike);
              this.selectedFiles = undefined;
              this.currentFile = undefined;
              this.preview = '';
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the image!';
            }

            this.currentFile = undefined;
          },
        });
      }
    }
  }

  delete(imageName: string): void {
    this.imageService.deleteImage(this.bikeId, imageName).subscribe({
      next: (event: any) => {
        const selectedBike = event as Bike;
        this.structureBikesStore.setSelectedBike(selectedBike);
      },
      error: (err: any) => {
        console.log(err);
        if (err.error && err.error.message) {
          this.message = err.error.message;
        } else {
          this.message = 'Could not delete the image!';
        }
      },
    });
  }

  returnToViewBike(): void {
    this.router.navigate(['/view-bike', { id: this.bikeId }]);
  }
}
