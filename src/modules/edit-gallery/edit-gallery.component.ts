import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Page} from "../../shared/constants";
import {ActivatedRoute, Router} from "@angular/router";
import {StructureBikesFacade} from "../../store/structure-bikes.facade";
import {HttpEventType} from "@angular/common/http";
import {Bike} from "../../shared/models/bike";
import {ImageService} from "../../shared/services/image.service";

@Component({
  selector: 'app-edit-gallery',
  templateUrl: './edit-gallery.component.html',
  styleUrls: ['./edit-gallery.component.scss']
})
export class EditGalleryComponent implements OnInit {
  bikeId: string;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';

  currentPage$: Observable<Page> = this.structureBikesFacade.currentPage$;
  page = Page;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private imageService: ImageService,
    private structureBikesFacade: StructureBikesFacade) {}

  ngOnInit(): void {
    this.structureBikesFacade.setCurrentPage(Page.EDIT_GALLERY);
    this.bikeId = this.route.snapshot.paramMap.get('id');
    this.structureBikesFacade.updateSelectedBike(+this.bikeId);
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
        const bikeId = this.route.snapshot.paramMap.get('id');

        this.imageService.addImage(bikeId, this.currentFile).subscribe({
          next: (event: any) => {
            if (event?.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else {
              const selectedBike = event as Bike;
              this.structureBikesFacade.setSelectedBike(selectedBike);
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
        this.structureBikesFacade.setSelectedBike(selectedBike);
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
