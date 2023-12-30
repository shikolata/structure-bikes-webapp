import {Component, Signal, inject} from '@angular/core';
import {Bike} from "../../models/bike";
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatCardModule } from '@angular/material/card';
import { StructureBikesStore } from 'src/store/sturucture-bikes.store';
import { SignalStoreProps } from '@ngrx/signals/src/signal-store-models';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    standalone: true,
    imports: [MatCardModule, SlickCarouselModule]
})
export class CarouselComponent {
  private structureBikesStore: SignalStoreProps<any> = inject(StructureBikesStore);

  selectedBike: Signal<Bike> = this.structureBikesStore.selectedBike;

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 4,
    autoPlay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: true,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
}
