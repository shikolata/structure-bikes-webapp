import { Component, OnInit, Signal, inject } from '@angular/core';
import {Weather} from "../../models/weather";
import { TranslateModule } from '@ngx-translate/core';
import { StructureBikesStore } from 'src/store/sturucture-bikes.store';
import { SignalStoreProps } from '@ngrx/signals/src/signal-store-models';

@Component({
    selector: 'app-weather-widget-main',
    templateUrl: './weather-widget.component.html',
    styleUrls: ['./weather-widget.component.css'],
    standalone: true,
    imports: [TranslateModule]
})
export class WeatherWidgetComponent implements OnInit {
  private structureBikesStore: SignalStoreProps<any> = inject(StructureBikesStore);

  weather: Signal<Weather> = this.structureBikesStore.weather;

  ngOnInit() {
    this.structureBikesStore.viewWeather();
  }
}
