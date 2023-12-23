import {Component, Input, OnInit, inject} from '@angular/core';
import {Observable} from "rxjs";
import {Bike} from "../../models/bike";
import {StructureBikesFacade} from "../../../store/structure-bikes.facade";
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    standalone: true,
    imports: [MatCardModule, SlickCarouselModule, AsyncPipe]
})
export class CarouselComponent {
  private structureBikesFacade: StructureBikesFacade = inject(StructureBikesFacade);

  selectedBike$: Observable<Bike> = this.structureBikesFacade.selectedBike$;

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
