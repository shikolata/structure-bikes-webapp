import {Component, EventEmitter, Input, Output, Signal, effect, inject} from '@angular/core';
import {Bike} from "../../models/bike";
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StructureBikesStore } from 'src/store/sturucture-bikes.store';
import { SignalStoreProps } from '@ngrx/signals/src/signal-store-models';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss'],
    standalone: true,
    imports: [MatButtonModule, MatIconModule, TranslateModule]
})
export class GalleryComponent {
  private structureBikesStore: SignalStoreProps<any> = inject(StructureBikesStore);
  
  @Input()
  isDeleteAvailable = false;

  @Output()
  galleryDelete = new EventEmitter<string>();

  selectedBike: Signal<Bike> = this.structureBikesStore.selectedBike;

  onDelete(imageName: string): void {
    this.galleryDelete.emit(imageName);
  }
}
