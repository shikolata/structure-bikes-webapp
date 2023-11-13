import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from "rxjs";
import {Bike} from "../../models/bike";
import {StructureBikesFacade} from "../../../store/structure-bikes.facade";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  @Input()
  isDeleteAvailable = false;

  @Output()
  galleryDelete = new EventEmitter<string>();

  selectedBike$: Observable<Bike> = this.structureBikesFacade.selectedBike$;

  constructor(private structureBikesFacade: StructureBikesFacade) {}

  onDelete(imageName: string): void {
    this.galleryDelete.emit(imageName);
  }
}
