import {Component, EventEmitter, Input, Output, inject} from '@angular/core';
import {Observable} from "rxjs";
import {Bike} from "../../models/bike";
import {StructureBikesFacade} from "../../../store/structure-bikes.facade";
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss'],
    standalone: true,
    imports: [MatButtonModule, MatIconModule, AsyncPipe, TranslateModule]
})
export class GalleryComponent {
  private structureBikesFacade: StructureBikesFacade = inject(StructureBikesFacade);
  
  @Input()
  isDeleteAvailable = false;

  @Output()
  galleryDelete = new EventEmitter<string>();

  selectedBike$: Observable<Bike> = this.structureBikesFacade.selectedBike$;

  onDelete(imageName: string): void {
    this.galleryDelete.emit(imageName);
  }
}
